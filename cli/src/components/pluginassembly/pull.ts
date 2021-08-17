import { Command } from 'components/cli';
import { getProjectSolutionComponents } from 'components/solutioncomponent';
import services from 'services';
import PluginAssembly from 'types/entity/PluginAssembly';
import { ComponentType } from 'types/entity/SolutionComponent';
import { isUuid, quote } from '../../common';

const save = async (pluginAssembly: PluginAssembly) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const paths = config.content.pluginAssemblies(pluginAssembly.name);
    await fileHandler.makeDir(paths.directory);
    await fileHandler.saveFile(paths.definition, { ...pluginAssembly, content: undefined }, 'json');
    await fileHandler.writeFile(paths.content, pluginAssembly.content, 'base64');
}

const pull: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
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