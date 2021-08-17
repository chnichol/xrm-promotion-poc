import { detailedDiff } from 'deep-object-diff';
import { Command } from 'components/cli';
import services from 'services';
import Entity from 'types/entity/Entity';
import EntityMetadata from 'types/metadata/EntityMetadata';
import { quote } from '../../common';
import { getProjectEntities } from '.';

type Diff = {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const loadDefinition = async (name: string) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const file = config.content.entities(name).definition;
    return await fileHandler.loadFile<Entity>(file, 'json');
}

const loadMetadata = async (name: string) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const entityFiles = config.content.entities(name);
    const metadata = await fileHandler.loadFile<EntityMetadata>(entityFiles.metadata, 'json');
    return metadata;
}

const push: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const projectNames = new Set<string>(await getProjectEntities());
    names = (names.length === 0 ? Array.from(projectNames) : names);
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (!projectNames.has(name)) {
            console.warn(`Project missing entity "${name}"`);
            continue;
        }
        // Definition tracking.
        {
            const local = await loadDefinition(name);
            const results = await api.entity.query({ filter: { logicalname: quote(name) } }).execute();
            const remote = results.length === 1 ? results[0] : undefined;
            if (remote) {
                const diff = detailedDiff(remote, local) as Diff;
                if (Object.keys(diff.added).length > 0 ||
                    Object.keys(diff.deleted).length > 0 ||
                    Object.keys(diff.updated).length > 0) {
                    console.warn(`The definition file for "${name}" has been changed, but can't be updated.`);
                }
            }
        }
        // Metadata tracking.
        {
            const local = await loadMetadata(name);
            const results = await api.entityMetadata.query({
                filter: { LogicalName: quote(name) }
            })
                .expandCollection('Attributes')
                .execute();
            const remote = results.length === 1 ? results[0] : undefined;
            if (remote) {
                const diff = detailedDiff(remote, local) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.entityMetadata.put(remote.MetadataId, local).execute();
                }
            }
        }
    }
}
export default push;