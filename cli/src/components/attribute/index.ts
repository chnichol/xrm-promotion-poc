import fs from 'fs/promises';
import path from 'path';
import config from '../../services/config';

export const getEntityAttributes = async (entity: string): Promise<string[]> => {
    const entityAttributeDir = config().content.entities(entity).attributes.directory;
    const attributeDirs = await fs.readdir(entityAttributeDir);
    const attributes = [];
    for (const a in attributeDirs) {
        const attributeDir = path.join(entityAttributeDir, attributeDirs[a]);
        if ((await fs.lstat(attributeDir)).isDirectory()) {
            attributes.push(attributeDirs[a]);
        }
    }
    return attributes;
}