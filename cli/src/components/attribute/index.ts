import fs from 'fs/promises';
import path from 'path';
import { getConfig, getPath } from '../../common/config';

export const getEntityAttributes = async (entity: string): Promise<string[]> => {
    const config = await getConfig();
    const entityDir = getPath(config).attributes(entity);
    const attributeDirs = await fs.readdir(entityDir);
    const attributes = [];
    for (const a in attributeDirs) {
        const attributeDir = path.join(entityDir, attributeDirs[a]);
        if ((await fs.lstat(attributeDir)).isDirectory()) {
            attributes.push(attributeDirs[a]);
        }
    }
    return attributes;
}