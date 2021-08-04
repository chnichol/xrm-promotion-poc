import { AuthenticationResult } from '@azure/msal-node';
import { Lock } from 'semaphore-async-await';
import createToken from './createToken';
import TokenStore from './tokenStore';

const lock = new Lock();

export default async (): Promise<AuthenticationResult> => {
    await lock.acquire();

    const store = new TokenStore('.xrm/id');
    const idToken = await store.loadToken();
    if (idToken && idToken.expiresOn && new Date(idToken.expiresOn) > new Date()) {
        return idToken;
    }

    // TODO: Enable using refresh tokens when the app registration has trust.
    const newToken = await createToken();
    await store.saveToken(newToken);

    lock.release();
    return newToken;
};