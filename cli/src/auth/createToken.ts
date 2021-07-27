import { AuthenticationResult, CryptoProvider, PublicClientApplication } from '@azure/msal-node';
import express from 'express';
import open from 'open';
import Config, { getConfig } from '../common/config';

const createApp = (config: Config) => {
    const app = express();
    const pca = new PublicClientApplication({ auth: config.auth });
    
    app.locals.pkceCodes = {
        challenge: '',
        challengeMethod: 'S256',
        verifier: ''
    };
    
    app.get('/', (_, response) => {
        const cryptoProvider = new CryptoProvider();
        cryptoProvider.generatePkceCodes().then(({ challenge, verifier }) => {
            app.locals.pkceCodes.challenge = challenge;
            app.locals.pkceCodes.verifier = verifier;
    
            const authCodeUrlParameters = {
                scopes: [ `${config.dynamics}/user_impersonation` ],
                redirectUri: config.urls.redirect,
                codeChallenge: app.locals.pkceCodes.challenge,
                codeChallengeMethod: app.locals.pkceCodes.challengeMethod
            };
            pca.getAuthCodeUrl(authCodeUrlParameters)
                .then(url => response.redirect(url));
        });
    });
    
    const token = new Promise<AuthenticationResult>(resolve => {
        app.get('/redirect', (request, response) => {
            const tokenRequest = {
                code: (request.query.code ?? '').toString(),
                scopes: [ `${config.dynamics}/user_impersonation` ],
                redirectUri: config.urls.redirect,
                codeVerifier: app.locals.pkceCodes.verifier
            };
        
            pca.acquireTokenByCode(tokenRequest).then(token => {
                response.sendStatus(200);
                if (token) {
                    resolve(token);
                }
            });
        });
    });
    return { app, token };
};

export default async (): Promise<AuthenticationResult> => {
    const config = await getConfig();
    const app = createApp(config);

    const server = app.app.listen(config.urls.port);
    const process = await open(config.urls.home, {app: { name: open.apps.edge, arguments: [ '--new-window' ]}});

    const token = await app.token;
    process.kill();
    server.close();

    return token;
};