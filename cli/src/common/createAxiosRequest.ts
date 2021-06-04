import { AxiosRequestConfig } from 'axios';
import { getToken } from '../auth';
import { getConfig } from './config';

export default async (entityName: string, query?: string): Promise<[string, AxiosRequestConfig]> => {
    const config = await getConfig();
    const token = await getToken();
    return [
        `${config.dynamics}/api/data/v9.0/${entityName}` + (query ? `?${query}` : ''),
        {
            headers: {
                Authorization: `${token.tokenType} ${token.accessToken}`
            }
        }
    ];
}