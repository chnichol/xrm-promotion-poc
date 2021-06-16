import { Argv } from 'yargs';
import api from '../../api';
import { getPositionals, isUuid, mkdir, quote, saveFile } from '../../common';
import Config, { getConfig, getPath } from '../../common/config';
import EntityMetadata from '../../types/metadata/EntityMetadata';
import listSolutionComponents from '../solutioncomponent/list';
import { ComponentType } from '../../types/entity/SolutionComponent';
import Entity from '../../types/entity/Entity';

const save = async (config: Config, entity: Entity, metadata: EntityMetadata) => {
    const paths = getPath(config).entity(entity);
    await mkdir(paths.directory);
    await saveFile(paths.definition, entity);
    if (metadata.Attributes) {
        await saveFile(paths.attributes, metadata.Attributes);
    }
    await saveFile(paths.metadata, { ...metadata, Attributes: undefined });
}

const pull = async (names: string[]) => {
    const config = await getConfig();
    const solutions = await listSolutionComponents([], 'local');
    const components = new Set<string>();
    solutions.forEach(solution => {
        solution.solution_solutioncomponent?.filter(component => {
            return component.componenttype === ComponentType.Entity;
        }).forEach(component => {
            components.add(component.objectid);
        });
    });
    names = (names.length === 0 ? Array.from(components) : names);

    const entities = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.entity.query({
            filter: (isUuid(name) ? { entityid: quote(name) } : { logicalname: quote(name) })
        })
        .execute();

        const property = isUuid(name) ? 'entityid' : 'logicalname';
        switch(results.length) {
            case 0:
                console.warn(`No entities found where ${property}="${name}"`)
                break;
            case 1:
                if (!components.has(results[0].entityid)) {
                    console.warn(`No solution includes the entity ${results[0].logicalname} (${results[0].entityid})`);
                }
                else if (!entities.has(results[0].entityid)) {
                    entities.add(results[0].entityid);
                    const metadata = await api.entityMetadata.lookup(results[0].entityid).expandCollection('Attributes').execute();
                    await save(config, results[0], metadata);
                }
                break;
            default:
                console.warn(`Multiple entities found where ${property}="${name}"`)
        }
    }    
}

export const command = (yargs: Argv<{}>) => yargs.command('pull'
    , 'Pulls the latest entity definitions from dynamics.'
    , builder => builder
        .usage('$0 pull <entities>')
        .positional('entities', {
            description: 'Entities to pull the latest of.',
            type: 'string'
        })
        .array('entities')
    , args => pull(getPositionals(args))
);

export default pull;