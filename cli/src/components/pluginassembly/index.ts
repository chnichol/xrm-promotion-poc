import fs from 'fs/promises';
import path from 'path';
import { exists } from '../../common';
import config from '../../services/config';

export const getPluginAssemblyComponents = async (): Promise<string[]> => {
    const componentRoot = config().content.pluginAssemblies.directory;
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

export const getPluginAssemblyProjects = async (): Promise<string[]> => {
    const projects = (await Promise.all(
        (await fs.readdir(config().project.pluginAssemblies.directory)).map(async item => {
            const p = path.join(config().project.pluginAssemblies.directory, item);
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