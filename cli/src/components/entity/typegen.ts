import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { mkdir, parseFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import AttributeTypeCode from '../../types/enum/AttributeTypeCode';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import { getEntityAttributes } from '../attribute';
import { Command } from '../cli';
import { getProjectEntities } from '.';

const getAttributeType = (attributeType: AttributeTypeCode) => {
    switch (attributeType) {
        case 'BigInt':
        case 'Decimal':
        case 'Double':
        case 'Integer':
            return 'number';
        case 'Boolean':
            return 'boolean';
        case 'DateTime':
            return 'Date';
        case 'EntityName':
        case 'String':
        case 'Uniqueidentifier':
            return 'string';
        default:
            return 'any';
    }
}

const loadEntityIndex = async (file: string): Promise<Set<string>> => {
    const entities = new Set<string>();
    try {
        const content = await fs.readFile(file, 'utf8');
        const imports = content.replace(/\r/g, '').split(/\n/g).filter(l => l.startsWith('import'));
        imports.map(i => i.split(/ /g)[1]).sort().forEach(e => {
            if (!entities.has(e)) {
                entities.add(e);
            }
        });
    }
    catch {}
    return entities;
}

const saveEntityIndex = async (file: string, entities: Set<string>): Promise<void> => {
    const entityList = Array.from(entities);
    await mkdir(path.dirname(file));
    const stream = await fs.open(file, 'w');
    for (let i = 0; i < entityList.length; i++) {
        const entity = entityList[i];
        await stream.write(`import ${entity} from './${entity}/index';${os.EOL}`);
    }
    await stream.write(`${os.EOL}export {${os.EOL}`);
    for (let i = 0; i < entityList.length; i++) {
        const entity = entityList[i];
        const isLast = (i === entityList.length - 1);
        await stream.write(`    ${entity}` + (isLast ? '' : ',') + os.EOL)
    }
    await stream.write('}');
    await stream.close();
}

const saveEntityTypeDef = async (file: string, attributes: AttributeMetadata[]) => {
    if (attributes.length === 0) {
        return;
    }
    await mkdir(path.dirname(file));
    const stream = await fs.open(file, 'w');
    await stream.write(`export default interface ${attributes[0].EntityLogicalName} {${os.EOL}`);
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        const attributeType = getAttributeType(attribute.AttributeType);
        await stream.write(`    ${attribute.LogicalName}: ${attributeType};${os.EOL}`);
    }
    await stream.write('}');
    await stream.close();
}

const typegen = async (name: string) => {
    const config = await getConfig();
    const entityPaths = getPath(config).entity({ logicalname: name });
    const typeFile = entityPaths.typedef;
    const attributes = await getEntityAttributes(name);
    const attributeMetadata = await Promise.all(attributes.map(async attribute => {
        const definitionFile = getPath(config).attribute(name, attribute).definition;
        const definition = await parseFile<AttributeMetadata>(definitionFile);
        return definition;
    }));
    await saveEntityTypeDef(typeFile, attributeMetadata);
}

const typegenIndex = async (names: string[]) => {
    const config = await getConfig();
    const entityPaths = getPath(config).entities;
    const indexFile = entityPaths.typedef;
    const entities = await loadEntityIndex(indexFile);
    names.forEach(name => {
        if (!entities.has(name)) {
            entities.add(name);
        }
    });
    await saveEntityIndex(indexFile, entities);
}

const typegenCommand: Command = async (names: string[]) => {
    names = (names.length === 0 ? await getProjectEntities() : names);
    for (let i = 0; i < names.length; i++) {
        await typegen(names[i]);
    }
    await typegenIndex(names);
}

export default typegenCommand;