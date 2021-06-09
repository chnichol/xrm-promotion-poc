import fs from 'fs/promises';
import path from 'path';
import { detailedDiff } from 'deep-object-diff';
import { lookup, publish, update } from '../api';
import { getConfig } from '../common/config';
import { getProjectSolutionComponents } from '../getSolution/components';
import { getProjectSolutions } from '../getSolution';
import { SolutionComponentType, WebResourceType } from '../types';

interface Diff {
    added: object;
    deleted: object;
    updated: object;
}

interface Options {
    solution?: string[];
}

const main = async (definition: any, content: Buffer) => {
    definition.content = content.toString('base64');
    const remote = await lookup('webresourceset', definition.webresourceid);

    const diff = detailedDiff(remote, definition) as Diff;
    if (Object.keys(diff.updated).length > 0) {
        await update('PATCH', 'webresourceset', definition.webresourceid, diff.updated);
        await publish({
            webresources: [ definition.webresourceid ]
        });
    }
}

const cli = async (names: string[], options: Options) => {
    const config = await getConfig();

    const solutionComponents = await getProjectSolutionComponents(await getProjectSolutions(options.solution));

    if (names.length === 0) {
        for (let key in solutionComponents) {
            if (solutionComponents[key].componenttype === SolutionComponentType.WebResource) {
                names.push(solutionComponents[key].objectid);
            }
        }
    }

    if (config.project.root) {
        const webResourceFolder = path.join(config.project.root, 'webresources');
        const webResourceList = (await fs.readdir(webResourceFolder)).map(item => path.join(webResourceFolder, item));
        for (let i = 0; i < webResourceList.length; i++) {
            const webResourceItem = webResourceList[i];
            if ((await fs.lstat(webResourceItem)).isDirectory()) {
                const definitionFile = path.join(webResourceItem, 'definition.json');
                const definition = JSON.parse(await fs.readFile(definitionFile, 'utf8'));
                const contentExt = WebResourceType[definition.webresourcetype].toLowerCase().replace(/jscript/g, 'js');
                const contentFile = path.join(webResourceItem, `content.${contentExt}`);
                const content = Buffer.from(await fs.readFile(contentFile, 'binary'), 'binary');
                
                if (names.find(n => n === definition.name || n === definition.webresourceid)) {
                    await main(definition, content);
                }
            }
        }
    }
}

export default main;
export {
    cli
}