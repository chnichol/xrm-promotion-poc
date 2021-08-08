import api from '../../api';
import { isUuid, mkdir, quote, saveFile } from '../../common';
import config from '../../config';
import EntityMetadata from '../../types/metadata/EntityMetadata';
import { ComponentType } from '../../types/entity/SolutionComponent';
import Entity from '../../types/entity/Entity';
import { Command } from '../cli';
import { getProjectSolutionComponents } from '../solutioncomponent';

const save = async (entity: Entity, metadata: EntityMetadata) => {
    const entityPaths = config().content.entities(entity.logicalname);
    await mkdir(entityPaths.directory);
    await saveFile(entityPaths.definition, entity);
    if (metadata.Attributes) {
        for (const a in metadata.Attributes) {
            const attribute = metadata.Attributes[a];
            const attributePaths = entityPaths.attributes(attribute.LogicalName);
            await mkdir(attributePaths.directory);
            await saveFile(attributePaths.definition, attribute);
        }
    }
    await saveFile(entityPaths.metadata, { ...metadata, Attributes: undefined });
}

const pull: Command = async (names: string[]) => {
    const [_, components] = await getProjectSolutionComponents(ComponentType.Entity);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    const entities = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.entity.query({
            filter: (isUuid(name) ? { entityid: quote(name) } : { logicalname: quote(name) })
        })
            .execute();

        const property = isUuid(name) ? 'entityid' : 'logicalname';
        switch (results.length) {
            case 0: {
                console.warn(`No entities found where ${property}="${name}"`)
                break;
            }
            case 1: {
                if (!components.find(c => c.objectid === results[0].entityid)) {
                    console.warn(`No solution includes the entity ${results[0].logicalname} (${results[0].entityid})`);
                }
                else if (!entities.has(results[0].entityid)) {
                    entities.add(results[0].entityid);
                    const metadata = await api.entityMetadata.lookup(results[0].entityid).expandCollection('Attributes').execute();
                    await save(results[0], metadata);
                }
                break;
            }
            default: {
                console.warn(`Multiple entities found where ${property}="${name}"`)
            }
        }
    }
}
export default pull;