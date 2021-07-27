import fs from 'fs/promises';
import path from 'path';
import { detailedDiff } from 'deep-object-diff';
import api from '../../api';
import { parseFile, parseFileB64, quote } from '../../common';
import Config, { getConfig, getPath } from '../../common/config'
import WebResource from '../../types/entity/WebResource';
import { Command } from '../cli';

interface Diff {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const load = async (config: Config, name: string) => {
    const definitionFile = getPath(config).webresource({ name }).definition;
    const definition = await parseFile<WebResource>(definitionFile);
    const contentFile = getPath(config).webresource(definition).content;
    if (contentFile) {
        definition.content = await parseFileB64(contentFile);
    }
    return definition;
}

const push: Command = async (names: string[]) => {
    const config = await getConfig();
    if (names.length === 0) {
        const dir = getPath(config).webresources;
        const dirlist = await fs.readdir(dir);
        for (let i = 0; i < dirlist.length; i++) {
            if ((await fs.lstat(path.join(dir, dirlist[i]))).isDirectory()) {
                names.push(dirlist[i]);
            }
        }
    }

    for (let i = 0; i < names.length; i++) {
        const webResource = await load(config, names[i]);
        const results = await api.webresource.query({
            filter: { name: quote(names[i]) }
        }).execute();
        switch(results.length) {
            case 0: {
                console.warn(`No remote web resources found where name="${names[i]}"`);
                break;
            }
            case 1: {
                const remote = results[0];
                const diff = detailedDiff(remote, webResource) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.webresource.patch(webResource.webresourceid, diff.updated).execute();
                    await api.publish({
                        webresources: [ webResource.webresourceid ]
                    });
                }
                break;
            }
            default: {
                console.warn(`Multiple remote web resources found where name="${names[i]}"`);
            }
        }
    }
}
export default push;