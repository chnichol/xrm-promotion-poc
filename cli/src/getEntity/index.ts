import fs from 'fs/promises';
import path from 'path';
import * as api from '../api';
import { getProjectSolutions } from '../getSolution';
import { isUuid } from '../common';
import { getConfig } from '../common/config';
import { EntityAttribute, SolutionComponentType } from '../types';
import { getProjectSolutionComponents, getWebSolutionComponents } from '../getSolution/components';

interface Options {
    outdir?: string;
    solution?: string[];
}

const saveEntity = async (outdir: string, entity: any) => {
    const dir = path.join(outdir, entity.LogicalName);
    await fs.mkdir(dir, { recursive: true }).catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });
    const attributeFile = path.join(dir, 'attributes.json');
    const definitionFile = path.join(dir, 'definition.json');
    await fs.writeFile(attributeFile, JSON.stringify(entity.Attributes, undefined, 2));
    await fs.writeFile(definitionFile, JSON.stringify({ ...entity, Attributes: undefined }, undefined, 2));
}

const main = async (entityName: string) => {
    const results = isUuid(entityName)
        ? { value: [ await api.lookup('EntityDefinitions', entityName) ] }
        : await api.query<any>('EntityDefinitions', { LogicalName: entityName });
    switch (results.value.length) {
        case 0:
            throw `No entities found with name "${entityName}"`;
        case 1:
            const result = results.value[0];
            const attributes = await api.query(`EntityDefinitions(${result.MetadataId})/Attributes`, undefined, [ 'LogicalName' ]) as {
                '@odata.context': string;
                value: EntityAttribute[];
            };
            result.Attributes = attributes.value;
            return result;
        default:
            throw `Multiple entities found with name "${entityName}"`;
    }
}

const cli = async (entityNames: string[], options: Options) => {
    const config = await getConfig();
    
    const solutionComponents = options.solution
        ? await getWebSolutionComponents(options.solution ?? [])
        : await getProjectSolutionComponents(await getProjectSolutions());

    if (entityNames.length === 0) {
        for (let key in solutionComponents) {
            if (solutionComponents[key].componenttype === SolutionComponentType.Entity) {
                entityNames.push(solutionComponents[key].objectid);
            }
        }
    }

    const entities = [];
    for (let i = 0; i < entityNames.length; i++) {
        const entity = await main(entityNames[i]);
        if (!entity) {
            continue;
        }

        if (!solutionComponents[entity.MetadataId]) {
            console.log(`No solution provided includes entity "${entity.MetadataId} (${entity.LogicalName})"`)
            continue;
        }

        entities.push(entity);

        if (options.outdir) {
            await saveEntity(options.outdir, entity);
        }
        else if (config.project.root) {
            const outdir = path.join(config.project.root, 'entities');
            await saveEntity(outdir, entity);
        }
    }
    return entities;
}

export default main;
export {
    cli
}