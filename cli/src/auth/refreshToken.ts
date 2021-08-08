import msal from '@azure/msal-node';
import config from '../config';

export default async (refreshToken: string): Promise<msal.AuthenticationResult | undefined> => {
    const pca = new msal.PublicClientApplication({
        auth: {
            authority: `https://login.microsoftonline.com/${config().settings.aadTenant}`,
            clientId: config().settings.aadClient
        }
    });
    const request = {
        refreshToken,
        scopes: ['openid']
    };
    return await pca.acquireTokenByRefreshToken(request) ?? undefined;
}