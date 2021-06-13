import axios from 'axios';
import { getToken } from '../auth';
import { getConfig } from '../common/config';
import { RequestBody, QueryBody, ExpandBody, LookupBody, UpdateBody } from './types';

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

const createFilterString = (filter: { [key: string]: string | undefined }) => {
    return '$filter=' + Object.keys(filter).filter(k => filter[k]).map(k => `${k} eq ${filter[k]}`).join(' and ');
}

const createPublishSection = (sectionName: string, rowName: string, uuids: string[]) => {
    return `<${sectionName}>${uuids.map(uuid => `<${rowName}>${uuid}</${rowName}>`)}</${sectionName}>`;
}

const createQueryString = (query: { filter?: { [key: string]: string | undefined }, select?: string[], expand?: ExpandBody[] }) => {
    const terms = [];
    if (query.filter && Object.keys(query.filter).length > 0) {
        terms.push(createFilterString(query.filter));    
    }
    if (query.select && query.select.length > 0) {
        terms.push(createSelectString(query.select));
    }
    if (query.expand && query.expand.length > 0) {
        terms.push(createExpandString(query.expand));
    }
    return terms.length ? '?' + terms.join('&') : '';
}

const createSelectString = (select: string[]) => {
    return '$select=' + select.join(',');
}

const getApiUrl = async () => `${(await getConfig()).dynamics}/api/data/v9.0`;

const getAuthHeader = async () => ((token) => `${token.tokenType} ${token.accessToken}`)(await getToken());

export const lookup = async <T> (lookupBody: LookupBody): Promise<T> => {
    const queryString = createQueryString(lookupBody);
    const url = `${await getApiUrl()}/${lookupBody.resource}(${lookupBody.id})${queryString}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data as T;
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
    const queryString = createQueryString(queryBody);
    const url = `${await getApiUrl()}/${queryBody.resource}${queryString}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: await getAuthHeader()
        }
    });
    return response.data as QueryResponse<T>;
}

export const update = async (updateBody: UpdateBody<any>): Promise<void> => {
    const url = `${await getApiUrl()}/${updateBody.resource}(${updateBody.id})`;
    switch (updateBody.method) {
        case 'PATCH':
            await axios.patch(url, updateBody.data, {
                headers: {
                    Authorization: await getAuthHeader(),
                    'If-Match': '*'
                }
            });
            break;
        case 'PUT':
            await axios.put(url, updateBody.data, {
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
            return await lookup<Response>(request);
        case 'update':
            return (await update(request)) as any;
    }
}