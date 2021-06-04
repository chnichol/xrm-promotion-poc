import axios from 'axios';
import fs from 'fs/promises';
import { WebResourceType } from '.';
import createAxiosRequest from '../common/createAxiosRequest';

export default async function download(name: string): Promise<void> {
    const request = await createAxiosRequest('webresourceset', `$filter=name eq '${name}'&$top=1`);
    const response = await axios.get(...request);
    const webResource = response.data.value[0];
    const content = webResource['content'];
    const type = webResource['webresourcetype'] as WebResourceType;
    webResource.content = undefined;
    await fs.writeFile(webResource.name + '.json', JSON.stringify(webResource, undefined, 2));
    await fs.writeFile(webResource.name + '.' + WebResourceType[type].toLowerCase().replace(/jscript/g, 'js'), Buffer.from(content, 'base64'));
    console.log(response.data.value[0].description);
}