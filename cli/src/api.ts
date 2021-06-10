import axios from 'axios';
import { getToken } from './auth';
import { getConfig } from './common/config';
import { Solution } from './components/solution/types';
import { WebResource } from './components/webresource/types';

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
    value: T[];
}

const createPublishSection = (sectionName: string, rowName: string, uuids: string[]) =>
    `<${sectionName}>${uuids.map(uuid => `<${rowName}>${uuid}</${rowName}>`)}</${sectionName}>`;

export const getApiUrl = async () => `${(await getConfig()).dynamics}/api/data/v9.0`;

export const getAuthHeader = async () => ((token) => `${token.tokenType} ${token.accessToken}`)(await getToken());

export const lookup = async (entity: string, id: string): Promise<any> => {
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

export const query = async <T> (entity: string, filter?: { [key: string]: any; }, select?: string[]): Promise<QueryResponse<T>> => {
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

interface GenericApi<ResourceType> {
    lookup(id: string): Promise<ResourceType>;
    query(): Promise<ResourceType[]>;
    query<S extends keyof ResourceType>(parameters: { filter: Partial<ResourceType>, select: S[] }): Promise<{ [Property in S]: ResourceType[Property] }[]>;
    query<S extends keyof ResourceType>(parameters: { select: S[] }): Promise<{ [Property in S]: ResourceType[Property] }[]>;
    query(parameters: { filter: Partial<ResourceType> }): Promise<ResourceType[]>;
    update(method: 'PUT', id: string, data: ResourceType): Promise<void>;
    update(method: 'PATCH', id: string, data: Partial<ResourceType>): Promise<void>;
}

class Api<ResourceType> implements GenericApi<ResourceType> {
    private readonly _resource: string;
    constructor(resource: string) {
        this._resource = resource;
    }
    lookup(id: string): Promise<ResourceType> {
        return lookup(this._resource, id);
    }
    query(): Promise<ResourceType[]>;
    query<S extends keyof ResourceType>(parameters: { filter: Partial<ResourceType>; select: S[]; }): Promise<{ [Property in S]: ResourceType[Property]; }[]>;
    query<S extends keyof ResourceType>(parameters: { select: S[]; }): Promise<{ [Property in S]: ResourceType[Property]; }[]>;
    query(parameters: { filter: Partial<ResourceType>; }): Promise<ResourceType[]>;
    query(parameters?: any) {
        return query<any>(this._resource, parameters.filter, parameters.select).then(r => r.value);
    }
    update(method: 'PUT', id: string, data: ResourceType): Promise<void>;
    update(method: 'PATCH', id: string, data: Partial<ResourceType>): Promise<void>;
    update(method: any, id: any, data: any) {
        return update(method, this._resource, id, data);
    }
}

const api = {
    solution: new Api<Solution>('solution'),
    webresource: new Api<WebResource>('webresourceset'),
    publish
};
export default api;