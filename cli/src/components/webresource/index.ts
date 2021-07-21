import fs from 'fs/promises';
import path from 'path';
import { getConfig } from '../../common/config';
import { WebResourceType } from '../../types/entity/WebResource';

export const getExtension = (webResource: { webresourcetype: WebResourceType }) => WebResourceType[webResource.webresourcetype].toLowerCase().replace(/jscript/g, 'js');

export const getWebResourceProjects = async () => {
    const config = await getConfig();
    const root = path.join(config.project.webresources, 'src');
    const webResources = (await Promise.all(
        (await fs.readdir(root)).map(async item => {
            const p = path.join(root, item);
            if ((await fs.lstat(p)).isFile() && item.match(/.*\.(js|ts)/g)) {
                return item;
            }
            else {
                return null;
            }
        })
    )).filter(p => !!p) as string[];
    return webResources;
}