import fs from 'fs/promises';
import path from 'path';
import { addedDiff, detailedDiff } from 'deep-object-diff';
import api from '../../api';
import { parseFile, parseFileB64, quote } from '../../common';
import config from '../../config'
import WebResource, { WebResourceType } from '../../types/entity/WebResource';
import { Command } from '../cli';

interface Diff {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const load = async (name: string) => {
    const definitionFile = config().content.webResources(name).definition;
    const definition = await parseFile<WebResource>(definitionFile);
    const contentFile = config().content.webResources(definition.name, definition.webresourcetype).content;
    if (contentFile) {
        definition.content = await parseFileB64(contentFile);
    }
    return definition;
}

const push: Command = async (names: string[]) => {
    if (names.length === 0) {
        const dir = config().content.webResources.directory;
        const dirlist = await fs.readdir(dir);
        for (let i = 0; i < dirlist.length; i++) {
            if ((await fs.lstat(path.join(dir, dirlist[i]))).isDirectory()) {
                names.push(dirlist[i]);
            }
        }
    }

    const changes = [];
    for (let i = 0; i < names.length; i++) {
        const webResource = await load(names[i]);  
        const results = await api.webresource.query({
            filter: { name: quote(names[i]) }
        }).execute();
        switch (results.length) {
            case 0: {
                const wr = {
                ...webResource,
                versionnumber: undefined,
                _organizationid_value: undefined,
                "organizationid@odata.bind": `/organizations(${webResource._organizationid_value})`,
                _createdby_value: undefined,
                "createdby@odata.bind": `/systemusers(${webResource._createdby_value})`,
                _modifiedby_value: undefined,
                "modifiedby@odata.bind": `/systemusers(${webResource._modifiedby_value})`,
                _modifiedonbehalfby_value: undefined,
                "modifiedonbehalfby@odata.bind": null,
                _createdonbehalfby_value: undefined,
                "createdonbehalfof@odata.bind": null,
                contentfileref: undefined,
                "ContentFileRef@odata.bind": null,
                contentjsonfileref: undefined,
                "ContentJsonFileRef@odata.bind" : null
            };

            //TODO: Figure out the proper type to use for the post requests
                await api.webresource.post(wr as any).execute();
                changes.push(wr);             
                break;
            }
            case 1: {
                const remote = results[0];
                const diff = detailedDiff(remote, webResource) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.webresource.patch(webResource.webresourceid, diff.updated).execute();
                    changes.push(webResource);
                }
                break;
            }
            default: {
                console.warn(`Multiple remote web resources found where name="${names[i]}"`);
            }
        }
    }
    await api.publish({
        webresources: changes.map(c => c.webresourceid)
    }); 
}
export default push;