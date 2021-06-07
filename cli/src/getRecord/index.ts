import fs from 'fs/promises';
import path from 'path';
import * as api from '../api';
import getEntity from '../getEntity';
import saveWebResource from './saveWebResource';

interface Options {
    id?: string;
    folder?: string;
    name?: string;
}

interface GetRecordQuery {
    id?: string;
    name?: string;
    nameAttribute: string;
}

const getRecordById = async (entitySetName: string, id: string) => await api.lookup(entitySetName, id);

const getRecordByName = async (entitySetName: string, name: string, nameAttribute: string) => {
    const query: any = {};
    query[nameAttribute] = name;
    const results = await api.query(entitySetName, query);
    switch (results.value.length) {
        case 0:
            throw `No records found for entity "${entitySetName}" with name "${name}"`;
        case 1:
            return results.value[0];
        default:
            throw `Multiple records found for entity "${entitySetName}" with name "${name}"`;
    }
}

const saveRecord = async (id: string, record: any, folder: string) => {
    await fs.mkdir(folder).catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });
    await fs.writeFile(path.join(folder, `${id}.json`), JSON.stringify(record, undefined, 2));
}

const main = async (entitySetName: string, options: { id: string } | { name: string, nameAttribute: string }) => {
    if(Object.keys(options).find(k => 'id')) {
        const opts = options as { id: string };
        return await getRecordById(entitySetName, opts.id);
    }
    else {
        const opts = options as { name: string, nameAttribute: string };
        return await getRecordByName(entitySetName, opts.name, opts.nameAttribute);
    }
};

const cli = async (entityName: string, options: Options) => {
    if (!options.id && !options.name) {
        throw 'Please provide either an ID or name to get a record.';
    }

    const entity = await getEntity(entityName);
    const record = await main(
        entity.EntitySetName,
        options.id
            ? { id: options.id }
            : { name: options.name as string, nameAttribute: entity.PrimaryNameAttribute }
    );

    if (options.folder) {
        switch (entityName) {
            case 'webresource':
                saveWebResource(record[entity.PrimaryIdAttribute], record, options.folder);
                break;
            default:
                saveRecord(record[entity.PrimaryIdAttribute], record, options.folder);
        }
    }
}

export default main;
export {
    cli
}