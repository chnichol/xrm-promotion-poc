import express = require('express');
import msal = require('@azure/msal-node');
import open = require('open');
import { getConfig } from '../common/config';

export default (): Promise<msal.AuthenticationResult> => new Promise(async (resolve) => {
    const config = await getConfig();
    const pca = new msal.PublicClientApplication({ auth: config.auth });
    const app = express();

    app.locals.pkceCodes = {
        challenge: '',
        challengeMethod: 'S256',
        verifier: ''
    };

    app.get('/', (_, response) => {
        const cryptoProvider = new msal.CryptoProvider();
        cryptoProvider.generatePkceCodes().then(({ challenge, verifier }) => {
            app.locals.pkceCodes.challenge = challenge;
            app.locals.pkceCodes.verifier = verifier;

            const authCodeUrlParameters = {
                scopes: [ 'openid' ],
                redirectUri: config.urls.redirect,
                codeChallenge: app.locals.pkceCodes.challenge,
                codeChallengeMethod: app.locals.pkceCodes.challengeMethod
            };
            pca.getAuthCodeUrl(authCodeUrlParameters)
                .then(url => response.redirect(url));
        });
    });

    app.get('/redirect', (request, response) => {
        const tokenRequest = {
            code: (request.query.code ?? '').toString(),
            scopes: [ 'openid' ],
            redirectUri: config.urls.redirect,
            codeVerifier: app.locals.pkceCodes.verifier
        };

        pca.acquireTokenByCode(tokenRequest).then(token => {
            response.sendStatus(200);
            process.kill();
            server.close();
            if (token) {
                resolve(token);
            }
        });
    });

    const server = app.listen(config.urls.port);
    const process = await open(config.urls.home, {app: { name: open.apps.edge, arguments: [ '--new-window' ]}});
});