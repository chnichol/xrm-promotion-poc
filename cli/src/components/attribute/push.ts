import { Command } from 'components/cli';
import { getProjectEntities } from 'components/entity';
import { quote } from 'helpers';
import services from 'services';
import AttributeMetadata from 'types/metadata/AttributeMetadata';
import Entity from 'types/entity/Entity';
import { getEntityAttributes } from '.';

const loadAttributeDefinition = async (entity: string, attribute: string) => {
    const config = services('Config');
    const { loadFile } = services('FileHandler');
    const file = config.content.entities(entity).attributes(attribute).definition;
    return await loadFile<AttributeMetadata>(file, 'json');
}

const loadEntityDefinition = async (entity: string) => {
    const config = services('Config');
    const { loadFile } = services('FileHandler');
    const file = config.content.entities(entity).definition;
    return await loadFile<Entity>(file, 'json');
}

const push: Command = async (names: string[]) => {
    // Split names into entity and attribute components.
    const api = services('DynamicsAPI');
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
                throw new Error(`No attribute found with name "${attributeName}" on entity "${entityName}"`);
            }
        }
    }
}
export default push;