import { getToken } from '../auth';
import { getConfig } from '../common/config';
import lookup from './lookup';
import query from './query';
import update from './update';

export {
    lookup,
    query,
    update
}

export const getApiUrl = async () => `${(await getConfig()).dynamics}/api/data/v9.0`;

export const getAuthHeader = async () => ((token) => `${token.tokenType} ${token.accessToken}`)(await getToken());