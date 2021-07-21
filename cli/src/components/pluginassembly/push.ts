import { detailedDiff } from 'deep-object-diff';
import api from '../../api';
import { parseFile, parseFileB64, quote } from '../../common';
import Config, { getConfig, getPath } from '../../common/config';
import PluginAssembly from '../../types/entity/PluginAssembly';
import { Command } from '../cli';
import { getPluginAssemblyComponents } from '.';

interface Diff {
    added: object;
    deleted: object;
    updated: object;
}

const load = async (config: Config, name: string) => {
    const definitionFile = getPath(config).pluginassembly(name).definition;
    const contentFile = getPath(config).pluginassembly(name).content;
    const definition = await parseFile<PluginAssembly>(definitionFile);
    if (contentFile) {
        definition.content = await parseFileB64(contentFile);
    }
    return definition;
}

const push: Command = async (names: string[]) => {
    names = names.length === 0 ? await getPluginAssemblyComponents() : names;

    const config = await getConfig();
    for (let i = 0; i < names.length; i++) {
        const pluginAssembly = await load(config, names[i]);
        const results = await api.pluginAssembly.query({
            filter: { name: quote(names[i]) }
        }).execute();
        switch(results.length) {
            case 0:
                console.warn(`No remote plugin assemblies found where name="${names[i]}"`);
                break;
            case 1:
                const remote = results[0];
                const diff = detailedDiff(remote, pluginAssembly) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.pluginAssembly.patch(pluginAssembly.pluginassemblyid, diff.updated).execute();
                }
                break;
            default:
                console.warn(`Multiple remote plugin assemblies found where name="${names[i]}"`);
        }
    }
}
export default push;