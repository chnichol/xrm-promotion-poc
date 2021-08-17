import path from 'path';
import services from 'services';
import { WebResourceType } from 'types/entity/WebResource';

export const getExtension = (webResource: { webresourcetype: WebResourceType }): string => WebResourceType[webResource.webresourcetype].toLowerCase().replace(/jscript/g, 'js');

export const getWebResourceProjects = async (): Promise<string[]> => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const root = path.join(config.project.webResources.directory, 'src');
    const webResources = (await Promise.all(
        (await fileHandler.readDir(root)).map(async item => {
            const p = path.join(root, item);
            if ((await fileHandler.getStats(p)).isFile() && item.match(/.*\.(js|ts)/g)) {
                return item;
            }
            else {
                return null;
            }
        })
    )).filter(p => !!p) as string[];
    return webResources;
}