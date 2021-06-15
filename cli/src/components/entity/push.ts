import { detailedDiff } from 'deep-object-diff';
import { Argv } from 'yargs';
import { getPositionals, parseFile, quote } from '../../common';
import { getConfig, getPath } from '../../common/config';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import EntityMetadata from '../../types/metadata/EntityMetadata';
import { getProjectEntities } from '.';
import Entity from '../../types/entity/Entity';
import api from '../../api';

type Diff = {
    added: object;
    deleted: object;
    updated: object;
}

const loadDefinition = async (name: string) => {
    const file = getPath(await getConfig()).entity({ logicalname: name }).definition;
    return await parseFile<Entity>(file);
}

const loadMetadata = async (name: string) => {
    const files = getPath(await getConfig()).entity({ logicalname: name });
    const metadata = await parseFile<EntityMetadata>(files.metadata);
    const attributes = await parseFile<AttributeMetadata[]>(files.attributes);
    metadata.Attributes = attributes;
    return metadata;
}

const push = async (names: string[]) => {
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
                    console.log(diff);
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
                    console.log(diff.updated);
                    await api.entityMetadata.put(remote.MetadataId, local).execute();
                }
            }
        }
    }
}

export const command = (yargs: Argv<{}>) => yargs.command('push'
    , 'Pushes local entity changes to dynamics.'
    , builder => builder
        .usage('$0 push entities')
        .positional('entities', {
            description: 'Entities to push.',
            type: 'string'
        })
        .array('entities')
    , args => push(getPositionals(args))
);

export default push;