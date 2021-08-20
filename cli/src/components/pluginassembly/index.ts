import path from 'path';
import services from 'services';

export const getPluginAssemblyComponents = async (): Promise<string[]> => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const componentRoot = config.content.pluginAssemblies.directory;
    const components = (await Promise.all(
        (await fileHandler.readDir(componentRoot)).map(async item => {
            const p = path.join(componentRoot, item);
            if ((await fileHandler.getStats(p)).isDirectory() && await fileHandler.exists(path.join(p, 'definition.json'))) {
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
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const projects = (await Promise.all(
        (await fileHandler.readDir(config.project.pluginAssemblies.directory)).map(async item => {
            const p = path.join(config.project.pluginAssemblies.directory, item);
            if ((await fileHandler.getStats(p)).isDirectory() && (await fileHandler.readDir(p)).find(file => file === `${item}.csproj`)) {
                return item;
            }
            else {
                return null;
            }
        })
    )).filter(p => !!p) as string[];
    return projects;
}