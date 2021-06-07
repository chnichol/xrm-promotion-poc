import fs from 'fs/promises';
import * as api from '../api';
import { EntityAttribute } from '../types';

interface Options {
    file?: string;
}

const saveEntity = async (file: string, entity: any) => {
    await fs.writeFile(file, JSON.stringify(entity, undefined, 2));
}

const main = async (entityName: string) => {
    const results = await api.query('EntityDefinitions', { LogicalName: entityName });
    switch (results.value.length) {
        case 0:
            throw `No entities found with name "${entityName}"`;
        case 1:
            const result = results.value[0];
            const attributes = await api.query(`EntityDefinitions(${result.MetadataId})/Attributes`, undefined, [ 'LogicalName' ]) as {
                '@odata.context': string;
                value: EntityAttribute[];
            };
            result.Attributes = attributes.value;
            return result;
        default:
            throw `Multiple entities found with name "${entityName}"`;
    }
}

const cli = async (entityName: string, options: Options) => {
    const entity = await main(entityName);
    if (options.file) {
        await saveEntity(options.file, entity);
    }
    return entity;
}

export default main;
export {
    cli
}