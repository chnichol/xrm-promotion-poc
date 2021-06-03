import msal from '@azure/msal-node';
import { getConfig } from '../common/config';

export default async (refreshToken: string): Promise<msal.AuthenticationResult | undefined> => {
    const config = await getConfig();
    const pca = new msal.PublicClientApplication({ auth: config.auth });
    const request = {
        refreshToken,
        scopes: [ 'openid' ]
    };
    return await pca.acquireTokenByRefreshToken(request) ?? undefined;
}