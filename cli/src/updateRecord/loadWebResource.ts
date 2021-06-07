import fs from 'fs/promises';
import { WebResourceType } from '../types';

export default async (file: string) => {
    const record = JSON.parse(await fs.readFile(file, 'utf8'));
    const contentType = record.webresourcetype as WebResourceType;
    const contentExt = WebResourceType[contentType].toLowerCase().replace(/jscript/g, 'js');
    const contentFile = `${file.split(/\./g, 2)[0]}.content.${contentExt}`;
    const content = Buffer.from(await fs.readFile(contentFile, 'binary'), 'binary').toString('base64');
    record.content = content;
    return record;
}
