import api from '../../api';
import { parseFile, quote } from '../../common';
import config from '../../common/config';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import { Command } from '../cli';
import { getProjectEntities } from '../entity';
import { getEntityAttributes } from '.';
import Entity from '../../types/entity/Entity';

const loadAttributeDefinition = async (entity: string, attribute: string) => {
    const file = config.paths.entities(entity).attributes(attribute).definition;
    return await parseFile<AttributeMetadata>(file);
}

const loadEntityDefinition = async (entity: string) => {
    const file = config.paths.entities(entity).definition;
    return await parseFile<Entity>(file);
}

const push: Command = async (names: string[]) => {
    // Split names into entity and attribute components.
    const attributes = new Map<string, string[]>();
    names.forEach(n => {
        const [entity, attribute] = n.split('/');
        if (!attributes.has(entity)) {
            attributes.set(entity, []);
        }
        if (attribute) {
            attributes.get(entity)?.push(attribute);
        }
    });

    // No names were given.
    if (names.length === 0) {
        const entities = await getProjectEntities();
        entities.forEach(e => {
            attributes.set(e, []);
        });
    }

    const attributeKeys = Array.from(attributes.keys());
    for (const a in attributeKeys) {
        const entityName = attributeKeys[a];
        // If there are entities which do not have attribute lists,
        // populate their lists with the full entity attribute list.
        const list = attributes.get(entityName)?.length ? attributes.get(entityName) as string[] : await getEntityAttributes(entityName);

        const entity = await loadEntityDefinition(entityName);
        const attributeApi = api.attribute(entity.entityid);
        for (const l in list) {
            const attributeName = list[l];
            const local = await loadAttributeDefinition(entityName, attributeName);
            const results = await attributeApi.query({ filter: { LogicalName: quote(attributeName) } }).execute();
            const remote = results.length === 1 ? results[0] : undefined;
            if (remote) {
                await attributeApi.put(remote.MetadataId, local).execute();
            }
            else {
                console.error(`No attribute found with name "${attributeName}" on entity ${entityName}`);
            }
        }
    }
}
export default push;