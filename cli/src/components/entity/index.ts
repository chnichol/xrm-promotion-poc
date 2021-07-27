import fs from 'fs/promises';
import path from 'path';
import { getConfig, getPath } from '../../common/config';

export const getProjectEntities = async (): Promise<string[]> => {
    const config = await getConfig();
    const entitydir = getPath(config).entities.directory;
    return (await Promise.all((await fs.readdir(entitydir)).map(async item => {
        if ((await fs.lstat(path.join(entitydir, item))).isDirectory()) {
            return item;
        }
        else {
            return null;
        }
    }))).filter(s => !!s) as string[];
}