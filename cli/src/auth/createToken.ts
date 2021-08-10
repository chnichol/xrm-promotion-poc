import { AuthenticationResult, CryptoProvider, PublicClientApplication } from '@azure/msal-node';
import express from 'express';
import open from 'open';
import config from '../config';

const createApp = () => {
    const app = express();
    const pca = new PublicClientApplication({
        auth: {
            authority: `https://login.microsoftonline.com/${config().settings.aadTenant}`,
            clientId: config().settings.aadClient
        }
    });

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
                scopes: [`${config().settings.dynamics}/user_impersonation`],
                redirectUri: config().settings.authRedirect,
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
                scopes: [`${config().settings.dynamics}/user_impersonation`],
                redirectUri: config().settings.authRedirect,
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
    const app = createApp();

    const server = app.app.listen(config().settings.authPort);
    const process = await open(config().settings.authHome, { app: { name: open.apps.edge, arguments: ['--new-window'] } });

    const token = await app.token;
    process.kill();
    server.close();

    return token;
};