import axios from 'axios';
import { getApiUrl, getAuthHeader } from '.';

export default async (entity: string, id: string): Promise<any | null> => {
    const response = await axios.get(await getApiUrl() + `/${entity}(${id})`, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data;
}