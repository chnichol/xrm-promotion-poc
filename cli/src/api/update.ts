import axios from 'axios';
import { getApiUrl, getAuthHeader } from './index';

export default async (entity: string, id: string, data: any): Promise<void> => {
    const url = `${await getApiUrl()}/${entity}(${id})`;
    await axios.patch(url, data, {
        headers: {
            Authorization: await getAuthHeader(),
            'If-Match': '*'
        }
    });
}