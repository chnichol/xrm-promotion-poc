import axios from 'axios';
import { getToken } from '../auth';
import { getConfig } from '../common/config';
import { RequestBody, QueryBody, ExpandBody, UpdateRequest, UpdateBody } from './types';

export interface PublishManifest {
    dashboards?: string[];
    entities?: string[];
    optionsets?: string[];
    ribbons?: string[];
    sitemaps?: string[];
    webresources?: string[];
}

export interface QueryResponse<T> {
    '@odata.context': string;
    value: T;
}

const createPublishSection = (sectionName: string, rowName: string, uuids: string[]) => {
    return `<${sectionName}>${uuids.map(uuid => `<${rowName}>${uuid}</${rowName}>`)}</${sectionName}>`;
}

const createFilterString = (filter: { [key: string]: string | undefined }) => {
    return '$filter=' + Object.keys(filter).filter(k => filter[k]).map(k => `${k} eq ${filter[k]}`).join(' and ');
}

const createSelectString = (select: string[]) => {
    return '$select=' + select.join(',');
}

const createExpandString = (expand: ExpandBody[]) => {
    const mainString = [];
    for (let i = 0; i < expand.length; i++) {
        const property = expand[i];
        const filter = expand[i].filter ?? {};
        const select = expand[i].select ?? [];
        const options = [];
        if (Object.keys(filter).length > 0) {
            options.push(createFilterString(filter));
        }
        if (select.length > 0) {
            options.push(createSelectString(select));
        }

        mainString.push(`${property.property}${options.length > 0 ? '(' + options.join(';') + ')' : ''}`);
    }
    return '$expand=' + mainString.join(',');
}

const getApiUrl = async () => `${(await getConfig()).dynamics}/api/data/v9.0`;

const getAuthHeader = async () => ((token) => `${token.tokenType} ${token.accessToken}`)(await getToken());

export const lookup = async <T> (entity: string, id: string): Promise<T> => {
    const response = await axios.get(await getApiUrl() + `/${entity}(${id})`, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data;
}

export const publish = async (manifest: PublishManifest) => {
    const url = `${await getApiUrl()}/PublishXml`;
    const xml = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<importexportxml>',
        manifest.entities ? createPublishSection('entities', 'entity', manifest.entities) : undefined,
        manifest.ribbons ? createPublishSection('ribbons', 'ribbon', manifest.ribbons) : undefined,
        manifest.dashboards ? createPublishSection('dashboards', 'dashboard', manifest.dashboards) : undefined,
        manifest.optionsets ? createPublishSection('optionsets', 'optionset', manifest.optionsets) : undefined,
        manifest.sitemaps ? createPublishSection('sitemaps', 'sitemap', manifest.sitemaps) : undefined,
        manifest.webresources ? createPublishSection('webresources', 'webresource', manifest.webresources) : undefined,
        '</importexportxml>'
    ].filter(x => !!x).join('');

    await axios.post(url, {
        ParameterXml: xml
    }, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
}

export const query = async <T> (queryBody: QueryBody): Promise<QueryResponse<T>> => {
    const query = [];
    if (queryBody.filter) {
        query.push(createFilterString(queryBody.filter));    
    }
    if (queryBody.select) {
        query.push(createSelectString(queryBody.select));
    }
    if (queryBody.expand) {
        query.push(createExpandString(queryBody.expand));
    }
    const queryString = query.length ? '?' + query.join('&') : '';
    const url = `${await getApiUrl()}/${queryBody.resource}${queryString}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data as QueryResponse<T>;
}

export const update = async (method: 'PATCH' | 'PUT', entity: string, id: string, data: any): Promise<void> => {
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

export default async <Properties, Response>(request: RequestBody | UpdateBody<Properties>): Promise<Response> => {
    switch (request.type) {
        case 'query': 
            return (await query<Response>(request)).value;
        case 'lookup':
            return await lookup<Response>(request.resource, request.id);
        case 'update':
            return (await update(request.method, request.resource, request.id, request.data)) as any;
    }
}