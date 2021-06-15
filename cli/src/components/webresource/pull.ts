import { Argv } from 'yargs';
import api from '../../api';
import { getPositionals, isUuid, mkdir, quote, saveFile, saveFileB64 } from '../../common';
import Config, { getConfig, getPath } from '../../common/config';
import listSolutionComponents from '../solutioncomponent/list';
import { ComponentType } from '../../types/entity/SolutionComponent';

const save = async (config: Config, webResource: any) => {
    const paths = getPath(config).webresource(webResource);
    await mkdir(paths.directory);
    await saveFile(paths.definition, { ...webResource, content: undefined });
    await saveFileB64(paths.content as string, webResource.content);
}

const pull = async (names: string[]) => {
    const config = await getConfig();
    const solutions = await listSolutionComponents([], 'local');
    const components = new Set<string>();
    solutions.forEach(solution => {
        solution.solution_solutioncomponent?.filter(component => {
            return component.componenttype === ComponentType.WebResource;
        }).forEach(component => {
            components.add(component.objectid);
        });
    });
    names = (names.length === 0 ? Array.from(components) : names);

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
                if (!components.has(results[0].webresourceid)) {
                    console.warn(`No solution includes the web resource ${results[0].name} (${results[0].webresourceid})`);
                }
                else if (!webResources.has(results[0].webresourceid)) {
                    webResources.add(results[0].webresourceid);
                    await save(config, results[0]);
                }
                break;
            default:
                console.warn(`Multiple Web Resources found where ${property}="${name}"`)
        }
    }    
}

export const command = (yargs: Argv<{}>) => yargs.command('pull'
    , 'Pulls the latest web resource definitions from dynamics.'
    , builder => builder
        .usage('$0 pull <web-resources>')
        .positional('web-resources', {
            description: 'Web resources to pull the latest of.',
            type: 'string'
        })
        .array('web-resources')
    , args => pull(getPositionals(args))
);

export default pull;