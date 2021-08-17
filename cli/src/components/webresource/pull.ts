import { Command } from 'components/cli';
import { getProjectSolutionComponents } from 'components/solutioncomponent';
import services from 'services';
import { ComponentType } from 'types/entity/SolutionComponent';
import WebResource from 'types/entity/WebResource';
import { isUuid, quote } from '../../common';

const save = async (webResource: WebResource) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const paths = config.content.webResources(webResource.name, webResource.webresourcetype);
    await fileHandler.makeDir(paths.directory);
    await fileHandler.saveFile(paths.definition, { ...webResource, content: undefined }, 'json');
    await fileHandler.writeFile(paths.content, webResource.content, 'base64');
}

const pull: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const [_, components] = await getProjectSolutionComponents(ComponentType.WebResource);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    const webResources = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.webresource.query({
            filter: (isUuid(name) ? { webresourceid: quote(name) } : { name: quote(name) })
        })
            .execute();

        const property = isUuid(name) ? 'webresourceid' : 'name';
        switch (results.length) {
            case 0:
                console.warn(`No Web Resources found where ${property}="${name}"`)
                break;
            case 1:
                if (!components.find(c => c.objectid === results[0].webresourceid)) {
                    console.warn(`No solution includes the web resource ${results[0].name} (${results[0].webresourceid})`);
                }
                else if (!webResources.has(results[0].webresourceid)) {
                    webResources.add(results[0].webresourceid);
                    await save(results[0]);
                }
                break;
            default:
                console.warn(`Multiple Web Resources found where ${property}="${name}"`)
        }
    }
}
export default pull;