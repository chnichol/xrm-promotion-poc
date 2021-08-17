import { detailedDiff } from 'deep-object-diff';
import { Command } from 'components/cli';
import services from 'services';
import PluginAssembly from 'types/entity/PluginAssembly';
import { quote } from '../../common';
import { getPluginAssemblyComponents } from '.';

interface Diff {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const load = async (name: string) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const definitionFile = config.content.pluginAssemblies(name).definition;
    const contentFile = config.content.pluginAssemblies(name).content;
    const definition = await fileHandler.loadFile<PluginAssembly>(definitionFile, 'json');
    if (contentFile) {
        definition.content = await fileHandler.readFile(contentFile, 'base64');
    }
    return definition;
}

const push: Command = async (names: string[]) => {
    names = names.length === 0 ? await getPluginAssemblyComponents() : names;
    const api = services('DynamicsAPI');
    for (let i = 0; i < names.length; i++) {
        const pluginAssembly = await load(names[i]);
        const results = await api.pluginAssembly.query({
            filter: { name: quote(names[i]) }
        }).execute();
        switch (results.length) {
            case 0: {
                console.warn(`No remote plugin assemblies found where name="${names[i]}"`);
                break;
            }
            case 1: {
                const remote = results[0];
                const diff = detailedDiff(remote, pluginAssembly) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.pluginAssembly.patch(pluginAssembly.pluginassemblyid, diff.updated).execute();
                }
                break;
            }
            default: {
                console.warn(`Multiple remote plugin assemblies found where name="${names[i]}"`);
            }
        }
    }
}
export default push;