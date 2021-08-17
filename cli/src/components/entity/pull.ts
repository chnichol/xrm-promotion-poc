import { Command } from 'components/cli';
import { getProjectSolutionComponents } from 'components/solutioncomponent';
import services from 'services';
import Entity from 'types/entity/Entity';
import { ComponentType } from 'types/entity/SolutionComponent';
import EntityMetadata from 'types/metadata/EntityMetadata';
import { isUuid, quote } from '../../common';

const save = async (entity: Entity, metadata: EntityMetadata) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const entityPaths = config.content.entities(entity.logicalname);
    await fileHandler.makeDir(entityPaths.directory);
    await fileHandler.saveFile(entityPaths.definition, entity, 'json');
    if (metadata.Attributes) {
        for (const a in metadata.Attributes) {
            const attribute = metadata.Attributes[a];
            const attributePaths = entityPaths.attributes(attribute.LogicalName);
            await fileHandler.makeDir(attributePaths.directory);
            await fileHandler.saveFile(attributePaths.definition, attribute, 'json');
        }
    }
    await fileHandler.saveFile(entityPaths.metadata, { ...metadata, Attributes: undefined }, 'json');
}

const pull: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const [_, components] = await getProjectSolutionComponents(ComponentType.Entity);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    const entities = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.entity.query({
            filter: (isUuid(name) ? { entityid: quote(name) } : { logicalname: quote(name) })
        }).execute();

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