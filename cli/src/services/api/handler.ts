import services from '..';
import { RequestBody, QueryBody, ExpandBody, LookupBody, UpdateBody, CreateBody } from './types';

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

const getApiUrl = async () => `${services('Config').settings.dynamics}/api/data/v9.0`;

const getAuthHeader = async () => {
    const token = await services('Auth').getToken();
    return `${token.tokenType} ${token.accessToken}`;
};

export const lookup = async <T>(lookupBody: LookupBody): Promise<T> => {
    const queryString = createQueryString(lookupBody);
    const url = `${await getApiUrl()}/${lookupBody.resource}(${lookupBody.id})${queryString}`;
    return services('HTTP').get<T>(url, { Authorization: await getAuthHeader() });
}

export const publish = async (manifest: PublishManifest): Promise<void> => {
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
    await services('HTTP').post(url, { ParameterXml: xml }, { Authorization: await getAuthHeader() });
}

export const query = async <T>(queryBody: QueryBody): Promise<QueryResponse<T>> => {
    const queryString = createQueryString(queryBody);
    const url = `${await getApiUrl()}/${queryBody.resource}${queryString}`;
    return await services('HTTP').get<QueryResponse<T>>(url, { Authorization: await getAuthHeader() });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = async (updateBody: UpdateBody<any>): Promise<void> => {
    const url = `${await getApiUrl()}/${updateBody.resource}(${updateBody.id})`;
    switch (updateBody.method) {
        case 'PATCH':
            await services('HTTP').patch(url, updateBody.data, {
                Authorization: await getAuthHeader(),
                'Content-Type': 'application/json',
                'If-Match': '*'
            });
            break;
        case 'PUT':
            await services('HTTP').put(url, updateBody.data, {
                Authorization: await getAuthHeader(),
                'Content-Type': 'application/json'
            });
            break;
    }
}

export const create = async (createBody: CreateBody<unknown, unknown>): Promise<any> => {
    const url = `${await getApiUrl()}/${createBody.resource}`;
    await services('HTTP').post(url, createBody.data, {
            Authorization: await getAuthHeader(),
            'Content-Type': 'application/json',
            'Prefer' : 'return=representation'
        }
    );
}

export default async <Properties, Response>(request: RequestBody | UpdateBody<Properties> | CreateBody<Properties, Properties>): Promise<Response> => {  // add case for create/delete
    switch (request.type) {
        case 'query':
            return (await query<Response>(request)).value;
        case 'lookup':
            return await lookup<Response>(request);
        case 'update':
            return (await update(request)) as unknown as Response;
        case 'create':
            return(await create(request)) as unknown as Response;
    }
}