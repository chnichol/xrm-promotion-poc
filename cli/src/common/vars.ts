import fs from 'fs/promises';
import path from 'path';
import { parseFile } from '.';

const flatten = (obj: any, prefix?: string): any => {
    if (obj === Object(obj)) {
        let result: any = {};
        Object.keys(obj).forEach(key => {
            const property = flatten(obj[key], prefix ? `${prefix}.${key}` : key)
            result = { ...result, ...property };
        });
        return result;
    }
    else {
        const result: any = {};
        if (prefix) {
            result[prefix] = obj;
        }
        return result;
    }
}

const getVar = async (path: string) => {
    const vars = await loadVars();
    const val = vars[path];
    if (!val) {
        throw `No variable found with key "${path}"`;
    }
    return val;
}

let _vars: any;
const loadVars = async () => {
    if (!_vars) {
        const vars = flatten(await parseFile<any>('vars.json'));
        const secrets = flatten(await parseFile<any>('secrets.json'));
        _vars = {
            ...vars,
            ...secrets
        };
    }
    return _vars;
}

export const replaceVars = async (content: string) => {
    // Look for any replacement tokens in the content.
    // Replacement tokens follow the following syntax:
    // -    {{key}}
    // -    {{key.subkey}}
    // -    {{key.subkey.subkey}}
    // -    etc...
    const matches = content.match(/{{\w+(\.\w+)*}}/g);
    if (matches && matches.length > 0) {
        for (let m in matches) {
            const match = matches[m];
            const lookup = match.replace('{{', '').replace('}}', '');
            const name = new RegExp(match.replace(/\./g, '\\.'));
            const value = await getVar(lookup);
            content = content.replace(name, value);
        }
    }
    return content;
}

export const replaceVarsInDirectory = async (directory: string, pattern?: RegExp) => {
    await Promise.all(
        (await fs.readdir(directory)).map(async item => {
            item = path.join(directory, item);
            if ((await fs.lstat(item)).isDirectory()) {
                await replaceVarsInDirectory(item);
            }
            else {
                if (!pattern || item.match(pattern)) {
                    await replaceVarsInFile(item);
                }
            }
        })
    );
}

export const replaceVarsInFile = async (file: string) => {
    const oldContent = await fs.readFile(file, 'utf8');
    const newContent = await replaceVars(oldContent);
    await fs.writeFile(file, newContent);
}