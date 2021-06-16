import fs from 'fs/promises';
import JSONBigInt from 'json-bigint';

export const createSearchUrl = (url: string, parameters: { [key: string]: string | undefined }, base?: string | URL | undefined) => {
    const searchUrl = new URL(url, base);
    for (let key in parameters) {
        const value = parameters[key];
        if (value) {
            searchUrl.searchParams.append(key, value);
        }
    }
    return searchUrl;
}

export const getPositionals = (args: { _: (number | string)[] }) => args._.slice(1).map(a => a.toString());

export const isUuid = (text: string) => {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
    return (text.match(uuidRegex) ?? []).length > 0
}

export const mkdir = (path: string) => fs.mkdir(path, { recursive: true })
    .catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });

export const parseFile = async <T>(path: string) => JSONBigInt({ useNativeBigInt: true }).parse(await fs.readFile(path, 'utf8')) as T;

export const parseFileB64 = async (path: string) => Buffer.from(await fs.readFile(path, 'binary'), 'binary').toString('base64');

export const quote = (a: any) => `'${a}'`;

export const saveFile = async (path: string, data: any) => fs.writeFile(path, JSONBigInt({ useNativeBigInt: true }).stringify(data, undefined, 4));

export const saveFileB64 = async (path: string, data: string) => fs.writeFile(path, Buffer.from(data, 'base64'));