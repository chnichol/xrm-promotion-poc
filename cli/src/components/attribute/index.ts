import fs from 'fs/promises';
import path from 'path';
import { parseFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';

export const getEntityAttributes = async (entity: string) => {
    const config = await getConfig();
    const entityDir = getPath(config).attributes(entity);
    const attributeDirs = await fs.readdir(entityDir);
    const attributes = [];
    for (let a in attributeDirs) {
        const attributeDir = path.join(entityDir, attributeDirs[a]);
        if ((await fs.lstat(attributeDir)).isDirectory()) {
            attributes.push(attributeDirs[a]);
        }
    }
    return attributes;
}