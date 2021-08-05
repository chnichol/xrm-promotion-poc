import { AuthenticationResult } from '@azure/msal-node';
import { Lock } from 'semaphore-async-await';
import config from '../common/config';
import createToken from './createToken';
import TokenStore from './tokenStore';

const lock = new Lock();

export default async (): Promise<AuthenticationResult> => {
    const store = new TokenStore(config.paths.cache.token);
    let idToken = await store.loadToken();
    if (idToken && idToken.expiresOn && new Date(idToken.expiresOn) > new Date()) {
        return idToken;
    }
    
    // TODO: Enable using refresh tokens when the app registration has trust.
    await lock.acquire();
    idToken = await store.loadToken();

    if (idToken && idToken.expiresOn && new Date(idToken.expiresOn) > new Date()) {
        return idToken;
    }

    const newToken = await createToken();
    await store.saveToken(newToken);
    lock.release();

    return newToken;
};