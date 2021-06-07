import fs from 'fs/promises';
import { detailedDiff } from 'deep-object-diff';
import * as api from '../api';
import getEntity from '../getEntity';
import loadWebResource from './loadWebResource';

interface Diff {
    added: object;
    deleted: object;
    updated: object;
}

interface Options {
    file?: string;
}

const loadRecord = async (file: string) => JSON.parse(await fs.readFile(file, 'utf8'));

const main = async (entityName: string, file: string) => {
    const entity = await getEntity(entityName);
    const localRecord = entityName === 'webresource' ? await loadWebResource(file) : await loadRecord(file);
    const recordId = localRecord[entity.PrimaryIdAttribute];
    const remoteRecord = await api.lookup(entity.EntitySetName, recordId);
    
    const diff = detailedDiff(remoteRecord, localRecord) as Diff;
    if (Object.keys(diff.updated).length > 0) {
        await api.update(entity.EntitySetName, recordId, diff.updated);
    }
}

const cli = async (entityName: string, options: Options) => {
    if (!options.file) {
        throw 'Missing file';
    }
    await main(entityName, options.file);
}

export default main;
export {
    cli
}