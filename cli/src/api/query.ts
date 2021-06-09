import axios from "axios"
import { getApiUrl, getAuthHeader } from "."
import { QueryResponse } from "../types";

export default async <T> (entity: string, filter?: { [key: string]: string; }, select?: string[]): Promise<QueryResponse<T>> => {
    const query = [];
    if (filter) {
        query.push('$filter=' + Object.keys(filter).map(k => `${k} eq '${filter[k]}'`).join(' and '));    
    }
    if (select) {
        query.push('$select=' + select.join(','));
    }
    const queryString = query.length ? '?' + query.join('&') : '';
    const url = `${await getApiUrl()}/${entity}${queryString}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data as QueryResponse<T>;
}