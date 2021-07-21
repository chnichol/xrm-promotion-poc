import fs from 'fs/promises';
import path from 'path';
import { exists } from '../../common';
import { getConfig, getPath } from '../../common/config';

export const getPluginAssemblyComponents = async () => {
    const config = await getConfig();
    const componentRoot = getPath(config).pluginassemblies;
    const components = (await Promise.all(
        (await fs.readdir(componentRoot)).map(async item => {
            const p = path.join(componentRoot, item);
            if ((await fs.lstat(p)).isDirectory() && await exists(path.join(p, 'definition.json'))) {
                return item;
            }
            else {
                return null;
            }
        })
    )).filter(p => !!p) as string[];
    return components;
}

export const getPluginAssemblyProjects = async () => {
    const config = await getConfig();
    const projects = (await Promise.all(
        (await fs.readdir(config.project.pluginassemblies)).map(async item => {
            const p = path.join(config.project.pluginassemblies, item);
            if ((await fs.lstat(p)).isDirectory() && (await fs.readdir(p)).find(file => file === `${item}.csproj`)) {
                return item;
            }
            else {
                return null;
            }
        })
    )).filter(p => !!p) as string[];
    return projects;
}