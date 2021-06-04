import axios from 'axios';
import fs from 'fs/promises';
import { WebResourceType } from '.';
import createAxiosRequest from '../common/createAxiosRequest';

export default async (name: string): Promise<void> => {
    const content = Buffer.from(await fs.readFile(name + '.js', 'utf8'), 'utf8').toString('base64');
    const json = JSON.parse(await fs.readFile(name + '.json', 'utf8'));
    json.content = content;
    let [url, config] = await createAxiosRequest('webresourceset');
    url += `(${json.webresourceid})`;
    config.headers['If-Match'] = '*';
    try {
        await axios.patch(url, { content }, config);
    }
    catch (e) {
        console.error(e);
    }
}