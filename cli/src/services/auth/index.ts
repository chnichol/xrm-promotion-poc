import { AuthenticationResult, CryptoProvider, PublicClientApplication } from '@azure/msal-node';
import express from 'express';
import open from 'open';
import { Lock } from 'semaphore-async-await';
import { Config } from '..';
import TokenStore from './tokenStore';
import { Service, ServiceCollection } from '../serviceBuilder';

export default interface Auth extends Service<'Auth', Auth> {
    getToken(): Promise<AuthenticationResult>;
}

export class OnBehalfOfAuth implements Auth {
    private readonly _config: Config;
    private readonly _lock: Lock;
    private readonly _tokenStore: TokenStore;
    public readonly name = 'Auth';

    constructor (config: Config, tokenStore: TokenStore) {
        this._config = config;
        this._tokenStore = tokenStore;

        this._lock = new Lock();
    }
    
    public init = (services: ServiceCollection) => new OnBehalfOfAuth(
        services.get('Config'),
        services.get('TokenStore')
    );

    public getToken = async (): Promise<AuthenticationResult> => {
        const isTokenValid = (token?: AuthenticationResult) => (token && token.expiresOn && new Date(token.expiresOn) > new Date());

        // Load the token from the store, if it's valid, use it.
        let idToken = await this._tokenStore.load();
        if (isTokenValid(idToken) && idToken) {
            return idToken;
        }

        // Before we do a login, acquire the login lock.
        // Additionally, validate the token from the store after getting the lock
        // to account for the case where a login completed while we were waiting.
        await this._lock.acquire();

        idToken = await this._tokenStore.load();
        if (isTokenValid(idToken) && idToken) {
            return idToken;
        }

        // TODO: Enable using refresh tokens when the app registration has trust.

        // Request the user login to Dynamics so we may generate a token.
        const newToken = await this._login();
        await this._tokenStore.save(newToken);
        await this._lock.release();

        return newToken;
    }

    private _login = async (): Promise<AuthenticationResult> => {
        const app = express();
        const pca = new PublicClientApplication({
            auth: {
                authority: `https://login.microsoftonline.com/${this._config.settings.aadTenant}`,
                clientId: this._config.settings.aadClient
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
                    scopes: [`${this._config.settings.dynamics}/user_impersonation`],
                    redirectUri: this._config.settings.authRedirect,
                    codeChallenge: app.locals.pkceCodes.challenge,
                    codeChallengeMethod: app.locals.pkceCodes.challengeMethod
                };
                pca.getAuthCodeUrl(authCodeUrlParameters)
                    .then(url => response.redirect(url));
            });
        });

        const redirect = new Promise<AuthenticationResult>(resolve => {
            app.get('/redirect', (request, response) => {
                const tokenRequest = {
                    code: (request.query.code ?? '').toString(),
                    scopes: [`${this._config.settings.dynamics}/user_impersonation`],
                    redirectUri: this._config.settings.authRedirect,
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

        const server = app.listen(this._config.settings.authPort);
        const process = await open(this._config.settings.authHome, { app: { name: open.apps.edge, arguments: ['--new-window'] } });

        const token = await redirect;
        process.kill();
        server.close();

        return token;
    };
}