import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getEntityAttributes } from '.';
import { mkdir, parseFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import { Command } from '../cli';
import { getProjectEntities } from '../entity';

const typegenImports = async (stream: fs.FileHandle) => {
    await stream.write(`import { Attribute } from 'xrm-types';${os.EOL}`);
    await stream.write(`import Entity from '../../index';${os.EOL}`);
    await stream.write(os.EOL);
}

const typegenAttribute = async (file: string, attribute: AttributeMetadata) => {
    await mkdir(path.dirname(file));
    const stream = await fs.open(file, 'w');

    await typegenImports(stream);

    await stream.write(`export default interface ${attribute.LogicalName} extends Attribute<Entity['${attribute.LogicalName}']> {${os.EOL}`);
    await stream.write(`}`);
    await stream.close();
}

const typegen: Command = async (names: string[]) => {
    const config = await getConfig();
    const entities = await getProjectEntities();
    names = names.length === 0 ? entities : names;
    for (let n in names) {
        const name = names[n];
        const attributes = await getEntityAttributes(name);
        for (let a in attributes) {
            const attribute = attributes[a];
            const definitionFile = getPath(config).attribute(name, attribute).definition;
            const definition = await parseFile<AttributeMetadata>(definitionFile);
            const typedefFile = getPath(config).attribute(name, attribute).typedef;
            await typegenAttribute(typedefFile, definition);
        }
    }
}
export default typegen;