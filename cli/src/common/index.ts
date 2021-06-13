import fs from 'fs/promises';

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

export const parseFile = async <T>(path: string) => JSON.parse(await fs.readFile(path, 'utf8')) as T;

export const quote = (a: any) => `'${a}'`;

export const saveFile = async(path: string, data: any) => fs.writeFile(path, JSON.stringify(data, undefined, 4));