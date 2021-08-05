import api from '../../api';
import { isUuid, mkdir, quote, saveFile, saveFileB64 } from '../../common';
import config from '../../common/config';
import { ComponentType } from '../../types/entity/SolutionComponent';
import WebResource from '../../types/entity/WebResource';
import { Command } from '../cli';
import { getProjectSolutionComponents } from '../solutioncomponent';

const save = async (webResource: WebResource) => {
    const paths = config.paths.webResources(webResource.name, webResource.webresourcetype);
    await mkdir(paths.directory);
    await saveFile(paths.definition, { ...webResource, content: undefined });
    await saveFileB64(paths.content, webResource.content);
}

const pull: Command = async (names: string[]) => {
    const [ _, components ] = await getProjectSolutionComponents(ComponentType.WebResource);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    const webResources = new Set<string>();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const results = await api.webresource.query({
            filter: (isUuid(name) ? { webresourceid: quote(name) } : { name: quote(name) })
        })
        .execute();

        const property = isUuid(name) ? 'webresourceid' : 'name';
        switch(results.length) {
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