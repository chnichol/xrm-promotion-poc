import api from '../../api';
import { isUuid, mkdir, quote, saveFile, saveFileB64 } from '../../common';
import config from '../../config';
import PluginAssembly from '../../types/entity/PluginAssembly';
import { ComponentType } from '../../types/entity/SolutionComponent';
import { Command } from '../cli';
import { getProjectSolutionComponents } from '../solutioncomponent';

const save = async (pluginAssembly: PluginAssembly) => {
    const paths = config().content.pluginAssemblies(pluginAssembly.name);
    await mkdir(paths.directory);
    await saveFile(paths.definition, { ...pluginAssembly, content: undefined });
    await saveFileB64(paths.content, pluginAssembly.content);
}

const pull: Command = async (names: string[]) => {
    const [_, components] = await getProjectSolutionComponents(ComponentType.PluginAssembly);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    const pluginAssemblies = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.pluginAssembly.query({
            filter: (isUuid(name) ? { pluginassemblyid: quote(name) } : { name: quote(name) })
        })
            .execute();

        const property = isUuid(name) ? 'pluginassemblyid' : 'name';
        switch (results.length) {
            case 0:
                console.warn(`No Plugin Assemblies found where ${property}="${name}"`)
                break;
            case 1:
                if (!components.find(c => c.objectid === results[0].pluginassemblyid)) {
                    console.warn(`No solution includes the plugin assembly ${results[0].name} (${results[0].pluginassemblyid})`);
                }
                else if (!pluginAssemblies.has(results[0].pluginassemblyid)) {
                    pluginAssemblies.add(results[0].pluginassemblyid);
                    await save(results[0]);
                }
                break;
            default:
                console.warn(`Multiple Plugin Assemblies found where ${property}="${name}"`)
        }
    }
}
export default pull;