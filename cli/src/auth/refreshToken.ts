import msal from '@azure/msal-node';
import config from '../common/config';

export default async (refreshToken: string): Promise<msal.AuthenticationResult | undefined> => {
    const pca = new msal.PublicClientApplication({ auth: config.settings.auth });
    const request = {
        refreshToken,
        scopes: [ 'openid' ]
    };
    return await pca.acquireTokenByRefreshToken(request) ?? undefined;
}