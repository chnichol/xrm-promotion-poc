import axios from 'axios';
import { getApiUrl, getAuthHeader } from './index';

export default async (method: 'PATCH' | 'PUT', entity: string, id: string, data: any): Promise<void> => {
    const url = `${await getApiUrl()}/${entity}(${id})`;
    switch (method) {
        case 'PATCH':
            await axios.patch(url, data, {
                headers: {
                    Authorization: await getAuthHeader(),
                    'If-Match': '*'
                }
            });
            break;
        case 'PUT':
            await axios.put(url, data, {
                headers: {
                    Authorization: await getAuthHeader()
                }
            });
            break;
    }
}