import fs from 'fs/promises';
import os from 'os';
import { EntityAttribute, ODataType } from '../types';

interface Options {
    entity?: string;
    file?: string;
}

interface TypeDef {
    name: string;
    attributes: {
        name: string;
        type: string;
    }[];
}

const generateTypeDef = (entityName: string, attributes: EntityAttribute[]) => ({
    name: entityName,
    attributes: attributes.map(a => ({ name: a.LogicalName, type: ODataType[a['@odata.type']] ?? 'any' }))
});

const saveTypeDef = async (file: string, typedef: TypeDef) => {
    const stream = await fs.open(file, 'w');
    await stream.write(`interface ${typedef.name} {${os.EOL}`);
    for (let i = 0; i < typedef.attributes.length; i++) {
        const attribute = typedef.attributes[i];
        await stream.write(`    ${attribute.name}: ${attribute.type};${os.EOL}`);
    }
    await stream.write('}');
    await stream.close();
};

const main = async (file: string) => {
    const record = JSON.parse(await fs.readFile(file, 'utf8'));
    const typedef = generateTypeDef(record.LogicalName, record.Attributes);
    return typedef;
}

const cli = async (options: Options) => {
    if (!options.entity) {
        throw 'Need entity file';
    }

    const typedef = await main(options.entity);
    if (options.file) {
        await saveTypeDef(options.file, typedef);
    }

    return typedef;
}

export default main;
export {
    cli
}