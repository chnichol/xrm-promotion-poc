import { ChildProcess, exec } from 'child_process';
import fs from 'fs/promises';
import xml2js from 'xml2js';

import services from '../services';

const JSONParser = services('JSONParser');

export interface ChildProcessWithPromise extends ChildProcess {
    promise: Promise<unknown>;
}

export const execPromise = (command: string): ChildProcessWithPromise => {
    const child = exec(command) as ChildProcessWithPromise;
    const promise = new Promise((resolve, reject) => {
        child.addListener('error', reject);
        child.addListener('exit', resolve);
    });
    child.promise = promise;
    return child;
}

export const exists = async (path: string): Promise<boolean> => {
    try {
        await fs.access(path);
        return true;
    }
    catch (e) {
        if (e.code == 'ENOENT') {
            return false;
        }
        throw e;
    }
}

export const mkdir = (path: string): Promise<string | void | undefined> => fs.mkdir(path, { recursive: true })
    .catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });

export const parseFile = async <T>(path: string): Promise<T> => JSONParser.parse<T>(await fs.readFile(path, 'utf8'));

export const parseFileB64 = async (path: string): Promise<string> => Buffer.from(await fs.readFile(path, 'binary'), 'binary').toString('base64');

export const parseFileXML = async <T>(path: string): Promise<T> => (await xml2js.parseStringPromise(await fs.readFile(path, 'utf8'))) as T;

export const quote = (a: string | { toString(): string }): string => `'${a}'`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const saveFile = async (path: string, data: any): Promise<void> => fs.writeFile(path, JSONParser.stringify(data, true));

export const saveFileB64 = async (path: string, data: string): Promise<void> => fs.writeFile(path, Buffer.from(data, 'base64'));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const saveFileXML = async (path: string, data: any): Promise<void> => fs.writeFile(path, new xml2js.Builder().buildObject(data), 'utf8');