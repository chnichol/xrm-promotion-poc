import path from 'path';
import services from 'services';

export const getProjectEntities = async (): Promise<string[]> => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const entitydir = config.content.entities.directory;
    return (await Promise.all((await fileHandler.readDir(entitydir)).map(async item => {
        if ((await fileHandler.getStats(path.join(entitydir, item))).isDirectory()) {
            return item;
        }
        else {
            return null;
        }
    }))).filter(s => !!s) as string[];
}