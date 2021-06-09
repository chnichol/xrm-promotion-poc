import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getConfig } from '../common/config';
import { EntityAttribute, ODataType } from '../types';

interface EntitySet {
    [key: string]: boolean;
}

interface TypeDef {
    name: string;
    attributes: {
        name: string;
        type: string;
    }[];
}

const loadEntityIndex = async (file: string): Promise<EntitySet> => {
    try {
        const content = await fs.readFile(file, 'utf8');
        const imports = content.replace(/\r/g, '').split(/\n/g).filter(l => l.startsWith('import'));
        const entities: EntitySet= {};
        imports.map(i => i.split(/ /g)[1]).sort().forEach(e => entities[e] || (entities[e] = true));
        return entities;
    }
    catch {
        return {};
    }
}

const saveEntityIndex = async (file: string, entities: EntitySet): Promise<void> => {
    const stream = await fs.open(file, 'w');
    for (let entity in entities) {
        await stream.write(`import ${entity} from './${entity}';${os.EOL}`);
    }
    await stream.write(`${os.EOL}export {${os.EOL}`);
    for (let i = 0; i < Object.keys(entities).length; i++) {
        const key = Object.keys(entities)[i];
        await stream.write(`    ${key}` + (i === Object.keys(entities).length - 1 ? '' : ',') + os.EOL)
    }
    await stream.write('}');
    await stream.close();
}

const saveTypeDef = async (file: string, typedef: TypeDef) => {
    const stream = await fs.open(file, 'w');
    await stream.write(`export default interface ${typedef.name} {${os.EOL}`);
    for (let i = 0; i < typedef.attributes.length; i++) {
        const attribute = typedef.attributes[i];
        await stream.write(`    ${attribute.name}: ${attribute.type};${os.EOL}`);
    }
    await stream.write('}');
    await stream.close();
};

const main = (entityName: string, attributes: EntityAttribute[]) => ({
    name: entityName,
    attributes: attributes.map(a => ({ name: a.LogicalName, type: ODataType[a['@odata.type']] ?? 'any' }))
});

const cli = async (entities: string[]) => {
    const config = await getConfig();
    const entitydir = path.join(config.project.root || '.', 'entities');
    if (entities.length === 0) {
        const dirItems = await fs.readdir(entitydir);
        for (let i = 0; i < dirItems.length; i++) {
            const item = dirItems[i]
            const itemPath = path.join(entitydir, item);
            if ((await fs.lstat(itemPath)).isDirectory()) {
                entities.push(item);
            }
        }
    }

    const index = await loadEntityIndex(path.join(entitydir, 'index.d.ts'));
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const record = JSON.parse(await fs.readFile(path.join(entitydir, entity, 'definition.json'), 'utf8'));
        const attributes = JSON.parse(await fs.readFile(path.join(entitydir, entity, 'attributes.json'), 'utf8'));
        const typedef = await main(record.LogicalName, attributes);
        if (!index[record.LogicalName]) {
            index[record.LogicalName] = true;
        }
        await saveTypeDef(path.join(entitydir, entity, 'index.d.ts'), typedef);
    }
    await saveEntityIndex(path.join(entitydir, 'index.d.ts'), index);
}

export default main;
export {
    cli
}