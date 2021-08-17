import path from 'path';
import services from 'services';

export const getEntityAttributes = async (entity: string): Promise<string[]> => {
    const [config, fileHandler] = [services('Config'), services('FileHandler')];
    const entityAttributeDir = config.content.entities(entity).attributes.directory;
    const attributeDirs = await fileHandler.readDir(entityAttributeDir);
    const attributes = [];
    for (const a in attributeDirs) {
        const attributeDir = path.join(entityAttributeDir, attributeDirs[a]);
        if ((await fileHandler.getStats(attributeDir)).isDirectory()) {
            attributes.push(attributeDirs[a]);
        }
    }
    return attributes;
}