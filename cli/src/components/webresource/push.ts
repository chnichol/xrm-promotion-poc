import path from 'path';
import { detailedDiff } from 'deep-object-diff';
import { Command } from 'components/cli';
import services from 'services';
import WebResource from 'types/entity/WebResource';
import { quote } from '../../common';

interface Diff {
    added: Record<string, unknown>;
    deleted: Record<string, unknown>;
    updated: Record<string, unknown>;
}

const load = async (name: string) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const definitionFile = config.content.webResources(name).definition;
    const definition = await fileHandler.loadFile<WebResource>(definitionFile, 'json');
    const contentFile = config.content.webResources(definition.name, definition.webresourcetype).content;
    if (contentFile) {
        definition.content = await fileHandler.readFile(contentFile, 'base64');
    }
    return definition;
}

const push: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const config = services('Config');
    const fileHandler = services('FileHandler');
    if (names.length === 0) {
        const dir = config.content.webResources.directory;
        const dirlist = await fileHandler.readDir(dir);
        for (let i = 0; i < dirlist.length; i++) {
            if ((await fileHandler.getStats(path.join(dir, dirlist[i]))).isDirectory()) {
                names.push(dirlist[i]);
            }
        }
    }

    for (let i = 0; i < names.length; i++) {
        const webResource = await load(names[i]);
        const results = await api.webresource.query({
            filter: { name: quote(names[i]) }
        }).execute();
        switch (results.length) {
            case 0: {
                console.warn(`No remote web resources found where name="${names[i]}"`);
                break;
            }
            case 1: {
                const remote = results[0];
                const diff = detailedDiff(remote, webResource) as Diff;
                if (Object.keys(diff.updated).length > 0) {
                    await api.webresource.patch(webResource.webresourceid, diff.updated).execute();
                    await api.publish({
                        webresources: [webResource.webresourceid]
                    });
                }
                break;
            }
            default: {
                console.warn(`Multiple remote web resources found where name="${names[i]}"`);
            }
        }
    }
}
export default push;