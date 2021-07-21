import api from '../../api';
import { getPositionals, isUuid, mkdir, quote, saveFile, saveFileB64 } from '../../common';
import Config, { getConfig, getPath } from '../../common/config';
import { ComponentType } from '../../types/entity/SolutionComponent';
import { Command } from '../cli';
import { getProjectSolutionComponents } from '../solutioncomponent';

const save = async (config: Config, pluginAssembly: any) => {
    const paths = getPath(config).pluginassembly(pluginAssembly.name);
    await mkdir(paths.directory);
    await saveFile(paths.definition, { ...pluginAssembly, content: undefined });
    await saveFileB64(paths.content as string, pluginAssembly.content);
}

const pull: Command = async (names: string[]) => {
    const config = await getConfig();
    const [ components ] = await getProjectSolutionComponents(ComponentType.PluginAssembly);
    names = (names.length === 0 ? Array.from(components) : names);

    const pluginAssemblies = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.pluginAssembly.query({
            filter: (isUuid(name) ? { pluginassemblyid : quote(name) } : { name: quote(name) })
        })
        .execute();

        const property = isUuid(name) ? 'pluginassemblyid' : 'name';
        switch(results.length) {
            case 0:
                console.warn(`No Plugin Assemblies found where ${property}="${name}"`)
                break;
            case 1:
                if (!components.has(results[0].pluginassemblyid)) {
                    console.warn(`No solution includes the plugin assembly ${results[0].name} (${results[0].pluginassemblyid})`);
                }
                else if (!pluginAssemblies.has(results[0].pluginassemblyid)) {
                    pluginAssemblies.add(results[0].pluginassemblyid);
                    await save(config, results[0]);
                }
                break;
            default:
                console.warn(`Multiple Plugin Assemblies found where ${property}="${name}"`)
        }
    }    
}
export default pull;