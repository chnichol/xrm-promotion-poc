import { detailedDiff } from 'deep-object-diff';
import api from '../../api';
import { parseFile, quote } from '../../common';
import { getConfig, getPath } from '../../common/config';
import EntityMetadata from '../../types/metadata/EntityMetadata';
import Entity from '../../types/entity/Entity';
import { Command } from '../cli';
import { getProjectEntities } from '.';

type Diff = {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const loadDefinition = async (name: string) => {
    const file = getPath(await getConfig()).entity({ logicalname: name }).definition;
    return await parseFile<Entity>(file);
}

const loadMetadata = async (name: string) => {
    const paths = getPath(await getConfig());
    const entityFiles = paths.entity({ logicalname: name });
    const metadata = await parseFile<EntityMetadata>(entityFiles.metadata);
    return metadata;
}

const push: Command = async (names: string[]) => {
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