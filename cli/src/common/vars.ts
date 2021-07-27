import fs from 'fs/promises';
import path from 'path';
import { parseFile } from '.';

type VarFile = {
    [key: string]: string | VarFile;
}

type VarLookup = {
    [key: string]: string;
}

const flatten = (obj: VarFile, prefix?: string): VarFile => {
    if (obj === Object(obj)) {
        let result: VarFile = {};
        Object.keys(obj).forEach(key => {
            const property = flatten(obj[key] as VarFile, prefix ? `${prefix}.${key}` : key)
            result = { ...result, ...property };
        });
        return result;
    }
    else {
        const result: VarFile = {};
        if (prefix) {
            result[prefix] = obj;
        }
        return result;
    }
}

const getVar = async (path: string): Promise<string> => {
    const vars = await loadVars();
    const val = vars[path];
    if (!val) {
        throw `No variable found with key "${path}"`;
    }
    return val;
}

let _vars: VarLookup;
const loadVars = async (): Promise<VarLookup> => {
    if (!_vars) {
        const vars = flatten(await parseFile<VarFile>('vars.json')) as VarLookup;
        const secrets = flatten(await parseFile<VarFile>('secrets.json')) as VarLookup;
        _vars = {
            ...vars,
            ...secrets
        };
    }
    return _vars;
}

export const replaceVars = async (content: string): Promise<string> => {
    // Look for any replacement tokens in the content.
    // Replacement tokens follow the following syntax:
    // -    {{key}}
    // -    {{key.subkey}}
    // -    {{key.subkey.subkey}}
    // -    etc...
    const matches = content.match(/{{\w+(\.\w+)*}}/g);
    if (matches && matches.length > 0) {
        for (const m in matches) {
            const match = matches[m];
            const lookup = match.replace('{{', '').replace('}}', '');
            const name = new RegExp(match.replace(/\./g, '\\.'));
            const value = await getVar(lookup);
            content = content.replace(name, value);
        }
    }
    return content;
}

export const replaceVarsInDirectory = async (directory: string, pattern?: RegExp): Promise<void> => {
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

export const replaceVarsInFile = async (file: string): Promise<void> => {
    const oldContent = await fs.readFile(file, 'utf8');
    const newContent = await replaceVars(oldContent);
    await fs.writeFile(file, newContent);
}