import fs from 'fs/promises';
import path from 'path';
import { detailedDiff } from 'deep-object-diff';
import { lookup, update } from '../api';
import { getConfig } from '../common/config';
import { getProjectSolutionComponents } from '../getSolution/components';
import { getProjectSolutions } from '../getSolution';
import { SolutionComponentType } from '../types';

interface Diff {
    added: object;
    deleted: object;
    updated: object;
}

interface Options {
    solution?: string[];
}

const main = async (entity: any) => {
    const remote = await lookup('EntityDefinitions', entity.MetadataId);

    const diff = detailedDiff(remote, entity) as Diff;
    if (Object.keys(diff.updated).length > 0) {
        await update('PUT', 'EntityDefinitions', entity.MetadataId, entity);
    }
}

const cli = async (names: string[], options: Options) => {
    const config = await getConfig();

    const solutionComponents = await getProjectSolutionComponents(await getProjectSolutions(options.solution));

    if (names.length === 0) {
        for (let key in solutionComponents) {
            if (solutionComponents[key].componenttype === SolutionComponentType.Entity) {
                names.push(solutionComponents[key].objectid);
            }
        }
    }

    if (config.project.root) {
        const entityFolder = path.join(config.project.root, 'entities');
        const entityList = (await fs.readdir(entityFolder)).map(item => path.join(entityFolder, item));
        for (let i = 0; i < entityList.length; i++) {
            const entityItem = entityList[i];
            if ((await fs.lstat(entityItem)).isDirectory()) {
                const definitionFile = path.join(entityItem, 'definition.json');
                const definition = JSON.parse(await fs.readFile(definitionFile, 'utf8'));
                if (names.find(n => n === definition.LogicalName || n === definition.MetadataId)) {
                    await main(definition);
                }
            }
        }
    }
}

export default main;
export {
    cli
}