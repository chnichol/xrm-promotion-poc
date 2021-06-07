import fs from 'fs/promises';
import path from 'path';
import { WebResourceType } from '../types'; 


export default async (id: string, record: any, folder: string) => {
    await fs.mkdir(folder).catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });
    const contentType = record.webresourcetype as WebResourceType;
    const contentExt = WebResourceType[contentType].toLowerCase().replace(/jscript/g, 'js');
    await fs.writeFile(path.join(folder, `${id}.content.${contentExt}`), Buffer.from(record.content, 'base64'));

    const recordJson = { ...record, content: undefined };
    await fs.writeFile(path.join(folder, `${id}.json`), JSON.stringify(recordJson, undefined, 2));
}