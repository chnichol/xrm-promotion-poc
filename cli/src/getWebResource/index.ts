import fs from 'fs/promises';
import path from 'path';
import * as api from '../api';
import { getProjectSolutions } from '../getSolution';
import { isUuid } from '../common';
import { getConfig } from '../common/config';
import { SolutionComponentType, WebResourceType } from '../types';
import { getProjectSolutionComponents, getWebSolutionComponents } from '../getSolution/components';

interface Options {
    outdir?: string;
    solution?: string[];
}

const saveWebResource = async (outdir: string, webResource: any) => {
    const dir = path.join(outdir, webResource.name);
    await fs.mkdir(dir, { recursive: true }).catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });
    const contentFile = path.join(dir, 'content.' + WebResourceType[webResource.webresourcetype].toLowerCase().replace(/jscript/g, 'js'));
    const definitionFile = path.join(dir, 'definition.json');

    await fs.writeFile(contentFile, Buffer.from(webResource.content, 'base64'));
    await fs.writeFile(definitionFile, JSON.stringify({ ...webResource, content: undefined }, undefined, 2));
}

const main = async (name: string) => {
    const results = isUuid(name)
        ? { value: [ await api.lookup('webresourceset', name) ] }
        : await api.query<any>('webresourceset', { name: name });
    switch (results.value.length) {
        case 0:
            throw `No entities found with ID or name "${name}"`;
        case 1:
            return results.value[0];
        default:
            throw `Multiple entities found with ID or name "${name}"`;
    }
}

const cli = async (names: string[], options: Options) => {
    const config = await getConfig();
    
    const solutionComponents = options.solution
        ? await getWebSolutionComponents(options.solution)
        : await getProjectSolutionComponents(await getProjectSolutions());

    if (names.length === 0) {
        for (let key in solutionComponents) {
            if (solutionComponents[key].componenttype === SolutionComponentType.WebResource) {
                names.push(solutionComponents[key].objectid);
            }
        }
    }

    const webResources = [];
    for (let i = 0; i < names.length; i++) {
        const webResource = await main(names[i]);
        if (!webResource) {
            continue;
        }

        if (!solutionComponents[webResource.webresourceid]) {
            console.log(`No solution provided includes entity "${webResource.webresourceid} (${webResource.name})"`)
            continue;
        }

        webResources.push(webResource);

        if (options.outdir) {
            await saveWebResource(options.outdir, webResource);
        }
        else if (config.project.root) {
            const outdir = path.join(config.project.root, 'webresources');
            await saveWebResource(outdir, webResource);
        }
    }
    return webResources;
}

export default main;
export {
    cli
}