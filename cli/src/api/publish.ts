import axios from 'axios';
import { getApiUrl, getAuthHeader } from '.';

interface PublishXml {
    dashboards?: string[];
    entities?: string[];
    optionsets?: string[];
    ribbons?: string[];
    sitemaps?: string[];
    webresources?: string[];
}

const section = (sectionName: string, rowName: string, uuids: string[]) => `<${sectionName}>${uuids.map(uuid => `<${rowName}>${uuid}</${rowName}>`)}</${sectionName}>`;

export default async (publishXml: PublishXml) => {
    const url = `${await getApiUrl()}/PublishXml`;
    const xml = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<importexportxml>',
        publishXml.entities ? section('entities', 'entity', publishXml.entities) : undefined,
        publishXml.ribbons ? section('ribbons', 'ribbon', publishXml.ribbons) : undefined,
        publishXml.dashboards ? section('dashboards', 'dashboard', publishXml.dashboards) : undefined,
        publishXml.optionsets ? section('optionsets', 'optionset', publishXml.optionsets) : undefined,
        publishXml.sitemaps ? section('sitemaps', 'sitemap', publishXml.sitemaps) : undefined,
        publishXml.webresources ? section('webresources', 'webresource', publishXml.webresources) : undefined,
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