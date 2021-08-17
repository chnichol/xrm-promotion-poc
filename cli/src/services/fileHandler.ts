import { Stats } from 'fs';
import fs, { FileHandle } from 'fs/promises';
import os from 'os';
import path from 'path';
import fsExtra from 'fs-extra';
import { JSONParser, XMLParser } from '.';
import { Service, ServiceCollection } from './serviceBuilder';

export default interface FileHandler extends Service<'FileHandler', FileHandler> {
    copyDir(src: string, dest: string, recursive?: boolean): Promise<void>;
    copyFile(src: string, dest: string): Promise<void>;
    exists(p: string): Promise<boolean>;
    getStats(p: string): Promise<Stats>;
    loadFile<T>(p: string, format: 'json' | 'xml'): Promise<T>;
    makeDir(p: string): Promise<void>;
    readDir(p: string, recursive?: boolean, regex?: RegExp): Promise<string[]>;
    readFile(p: string, format: 'base64' | 'utf8'): Promise<string>;
    removeDir(p: string, recursive?: boolean, force?: boolean): Promise<void>;
    removeFile(p: string, force?: boolean): Promise<void>;
    saveFile<T>(p: string, data: T, format: 'json' | 'xml'): Promise<void>;
    write(f: FileHandle, content: string): Promise<void>;
    writeln(f: FileHandle, content: string): Promise<void>;
    writeFile(p: string, content: string, format: 'base64' | 'utf8'): Promise<void>;
}

export class LocalFileHandler implements FileHandler {
    private readonly _jsonParser: JSONParser;
    private readonly _xmlParser: XMLParser;
    public readonly name = 'FileHandler';

    constructor (jsonParser: JSONParser, xmlParser: XMLParser) {
        this._jsonParser = jsonParser;
        this._xmlParser = xmlParser;
    }

    public init = (services: ServiceCollection) => new LocalFileHandler(
        services.get('JSONParser'),
        services.get('XMLParser')
    );

    public copyDir = (src: string, dest: string, recursive?: boolean) => fsExtra.copy(src, dest, { overwrite: true, recursive });

    public copyFile =  (src: string, dest: string) => fs.copyFile(src, dest);
    
    public exists = async (p: string) => {
        try {
            await fs.access(p);
            return true;
        }
        catch (e) {
            if (e.code == 'ENOENT') {
                return false;
            }
            throw e;
        }
    };

    public getStats = (p: string) => fs.lstat(p);

    public loadFile = async <T>(p: string, format: 'json' | 'jsonc' | 'xml') =>
        format.startsWith('json')
            ? this._jsonParser.parse<T>(await fs.readFile(p, 'utf8'), format === 'jsonc')
            : await this._xmlParser.parse<T>(await fs.readFile(p, 'utf8'))

    public makeDir = async (p: string) => {
        try {
            await fs.mkdir(p, { recursive: true });
        }
        catch(e) {
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }
    };

    public readDir = async (p: string, recursive?: boolean, regex?: RegExp): Promise<string[]> =>
        (await Promise.all(
            (await fs.readdir(p)).map(
                async (pPartial) => {
                    const pFull = path.join(p, pPartial);
                    if ((await fs.lstat(pFull)).isDirectory()) {
                        return recursive ? await this.readDir(pFull, true, regex) : [];
                    }
                    else {
                        return (!regex || pFull.match(regex)) ? [ pFull ] : [];
                    }
                }
            )
        )).reduce((acc, val) => acc.concat(val), []).map(p => path.basename(p));

    public readFile = async (p: string, format: 'base64' | 'utf8') =>
        format === 'base64'
            ? Buffer.from(await fs.readFile(p, 'binary'), 'binary').toString('base64')
            : await fs.readFile(p, 'utf8');

    public removeDir = (p: string, recursive?: boolean, force?: boolean) => fs.rm(p, { force, maxRetries: 10, recursive, retryDelay: 100 });

    public removeFile = (p: string, force?: boolean) => fs.rm(p, { force });

    public saveFile = async <T>(p: string, data: T, format: 'json' | 'xml') =>
        format === 'json'
            ? await fs.writeFile(p, this._jsonParser.stringify(data, true), 'utf8')
            : await fs.writeFile(p, this._xmlParser.stringify(data), 'utf8');

    public write = async (f: FileHandle, content: string) => {
        await fs.write(f, content);
    };

    public writeln = async (f: FileHandle, content: string) => {
        await fs.write(f, content + os.EOL);
    };

    public writeFile = async (p: string, content: string, format: 'base64' | 'utf8') =>
        format === 'base64'
            ? await fs.writeFile(p, Buffer.from(content, 'base64'))
            : await fs.writeFile(p, content);
}