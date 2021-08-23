import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { v4 as uuid } from 'uuid';
import JSONParser, { SystemJSONParser } from 'services/jsonParser';
import ServiceBuilder from 'services/serviceBuilder';
import XMLParser, { XML2JSParser } from 'services/xmlParser';

import FileHandler, { LocalFileHandler } from 'services/fileHandler';

const testdir = uuid();
const services = ServiceBuilder
    .create()
    .addSingleton<JSONParser>(SystemJSONParser)
    .addSingleton<XMLParser>(XML2JSParser)
    .services;

describe('services/fileHandler/localFileHandler', () => {
    beforeAll(async () => {
        await fs.mkdir(testdir);
    });

    it('can create the service with no parameters', () => {
        const service = new LocalFileHandler(undefined as any, undefined as any);
        expect(service.name).toStrictEqual('FileHandler');
        expect(service.init).toBeDefined();
    });

    it('can copy a directory deeply', async () => {
        const files = [
            { contents: 'First file contents.', name: 'firstfile.txt' },
            { contents: 'Second file contents.', name: 'secondfile.txt' },
            { contents: 'Third file contents.', name: 'thirdfile.txt' }
        ];
        const source = path.join(testdir, 'copydirdeepsource');
        const target = path.join(testdir, 'copydirdeeptarget');
        await fs.mkdir(source);
        await Promise.all(files.map(f => fs.writeFile(path.join(source, f.name), f.contents, 'utf8')));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.copyDir(source, target);

        expect(await fs.readdir(testdir)).toContain(path.basename(target));
        const targetDir = await fs.readdir(target);
        await Promise.all(files.map(async f => {
            expect(targetDir).toContain(f.name);
            expect(await fs.readFile(path.join(target, f.name), 'utf8')).toStrictEqual(f.contents);
        }));
    });

    it('can copy a file', async () => {
        const contents = 'Test file contents.';
        const source = path.join(testdir, 'copyfilesource.txt');
        const target = path.join(testdir, 'copyfiletarget.txt');
        await fs.writeFile(source, contents, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.copyFile(source, target);

        expect(await fs.readdir(testdir)).toContain(path.basename(target));
        expect(await fs.readFile(target, 'utf8')).toStrictEqual(contents);
    });

    it('can check an existing file', async () => {
        const contents = 'Test file contents.';
        const file = path.join(testdir, 'exists.txt');
        await fs.writeFile(file, contents, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        expect(await fileHandler.exists(file)).toBeTruthy();
    });

    it('can check a missing file', async () => {
        const file = path.join(testdir, 'existsnot.txt');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        expect(await fileHandler.exists(file)).toBeFalsy();
    });

    it('can get file stats', async () => {
        const contents = 'Test file contents.';
        const file = path.join(testdir, 'stats.txt');
        await fs.writeFile(file, contents, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        expect(await fileHandler.getStats(file)).toBeDefined();
    });

    it('can load json files', async () => {
        const contents = `{${os.EOL}`
            + `  "value": "JSON test value"${os.EOL}`
            + '}';
        const file = path.join(testdir, 'loadjson.json');
        await fs.writeFile(file, contents, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const result = await fileHandler.loadFile<{ value: string }>(file, 'json');
        expect(result).toBeDefined();
        expect(result.value).toStrictEqual('JSON test value');
    });

    it('can load jsonc files', async () => {
        const contents = `{${os.EOL}`
            + `  "value": "JSONC test value" // Comment in the JSONC file${os.EOL}`
            + '}';
        const file = path.join(testdir, 'loadjsonc.jsonc');
        await fs.writeFile(file, contents, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const result = await fileHandler.loadFile<{ value: string }>(file, 'jsonc');
        expect(result).toBeDefined();
        expect(result.value).toStrictEqual('JSONC test value');
    });

    it.skip('can load xml files', () => {
        // Skip XML testing because frankly,
        // I'm not sure what the data structure is supposed to look like.
    });

    it('can make a new directory', async () => {
        const dir = path.join(testdir, 'makenewdir');
        
        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.makeDir(dir);

        expect(await fs.readdir(testdir)).toContain(path.basename(dir));
    });

    it('can make an existing directory', async () => {
        const dir = path.join(testdir, 'makeolddir');
        await fs.mkdir(dir);

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.makeDir(dir);

        expect(await fs.readdir(testdir)).toContain(path.basename(dir));
    });

    it('can read dir shallowly', async () => {
        const dirs = [
            path.join(testdir, 'readdirshallow'),
            path.join(testdir, 'readdirshallow', 'deeper')
        ];
        await Promise.all(dirs.map(d => fs.mkdir(d)));

        const files = [
            path.join(testdir, 'readdirshallow', 'file1.txt'),
            path.join(testdir, 'readdirshallow', 'file2.txt'),
            path.join(testdir, 'readdirshallow', 'file3.txt'),
            path.join(testdir, 'readdirshallow', 'deeper', 'file4.txt'),
            path.join(testdir, 'readdirshallow', 'deeper', 'file5.txt')
        ];
        await Promise.all(files.map(f => fs.writeFile(f, '')));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const list = await fileHandler.readDir(dirs[0]);
        expect(list).not.toContain(path.basename(dirs[0]));
        expect(list).toContain(path.basename(dirs[1]));
        expect(list).toContain(path.basename(files[0]));
        expect(list).toContain(path.basename(files[1]));
        expect(list).toContain(path.basename(files[2]));
        expect(list).not.toContain(path.basename(files[3]));
        expect(list).not.toContain(path.basename(files[4]));
    });

    it('can read dir shallowly with regex', async () => {
        const dirs = [
            path.join(testdir, 'readdirshallowregex'),
            path.join(testdir, 'readdirshallowregex', 'deeper')
        ];
        await Promise.all(dirs.map(d => fs.mkdir(d)));

        const files = [
            path.join(testdir, 'readdirshallowregex', 'file1.txt'),
            path.join(testdir, 'readdirshallowregex', 'file2.txt'),
            path.join(testdir, 'readdirshallowregex', 'file3.txt'),
            path.join(testdir, 'readdirshallowregex', 'deeper', 'file4.txt'),
            path.join(testdir, 'readdirshallowregex', 'deeper', 'file5.txt')
        ];
        await Promise.all(files.map(f => fs.writeFile(f, '')));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const list = await fileHandler.readDir(dirs[0], false, /file2/g);
        expect(list).not.toContain(path.basename(dirs[0]));
        expect(list).not.toContain(path.basename(dirs[1]));
        expect(list).not.toContain(path.basename(files[0]));
        expect(list).toContain(path.basename(files[1]));
        expect(list).not.toContain(path.basename(files[2]));
        expect(list).not.toContain(path.basename(files[3]));
        expect(list).not.toContain(path.basename(files[4]));
    });

    it('can read dir deeply', async () => {
        const dirs = [
            path.join(testdir, 'readdirdeep'),
            path.join(testdir, 'readdirdeep', 'deeper')
        ];
        await Promise.all(dirs.map(d => fs.mkdir(d)));

        const files = [
            path.join(testdir, 'readdirdeep', 'file1.txt'),
            path.join(testdir, 'readdirdeep', 'file2.txt'),
            path.join(testdir, 'readdirdeep', 'file3.txt'),
            path.join(testdir, 'readdirdeep', 'deeper', 'file4.txt'),
            path.join(testdir, 'readdirdeep', 'deeper', 'file5.txt')
        ];
        await Promise.all(files.map(f => fs.writeFile(f, '')));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const list = await fileHandler.readDir(dirs[0], true);
        expect(list).not.toContain(path.basename(dirs[0]));
        expect(list).toContain(path.basename(dirs[1]));
        files.forEach(f => expect(list).toContain(path.basename(f)));
    });

    it('can read dir deeply with regex', async () => {
        const dirs = [
            path.join(testdir, 'readdirdeepregex'),
            path.join(testdir, 'readdirdeepregex', 'deeper')
        ];
        await Promise.all(dirs.map(d => fs.mkdir(d)));

        const files = [
            path.join(testdir, 'readdirdeepregex', 'file1.txt'),
            path.join(testdir, 'readdirdeepregex', 'file2.txt'),
            path.join(testdir, 'readdirdeepregex', 'file3.txt'),
            path.join(testdir, 'readdirdeepregex', 'deeper', 'file4.txt'),
            path.join(testdir, 'readdirdeepregex', 'deeper', 'file5.txt')
        ];
        await Promise.all(files.map(f => fs.writeFile(f, '')));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        const list = await fileHandler.readDir(dirs[0], true, /file3|file5/g);
        expect(list).not.toContain(path.basename(dirs[0]));
        expect(list).not.toContain(path.basename(dirs[1]));
        expect(list).not.toContain(path.basename(files[0]));
        expect(list).not.toContain(path.basename(files[1]));
        expect(list).toContain(path.basename(files[2]));
        expect(list).not.toContain(path.basename(files[3]));
        expect(list).toContain(path.basename(files[4]));
    });

    it('can read binary files as base64 strings', async () => {
        const file = path.join(testdir, 'readb64');
        const b64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFgAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAACAAAAADoAQAAQAAACAAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDIwNv/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIACAAIAMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYF/8QAGAEAAgMAAAAAAAAAAAAAAAAAAAECBAX/2gAMAwEAAhADEAAAAaU+BUuKgXgChtqFJn265TAAj//EABwQAAICAwEBAAAAAAAAAAAAAAECAAMEEhMFEf/aAAgBAQABBQIUThOENMw/Ts1S0OpvVQ2XQopsVQuWvx8iG8wMVnRp1YjfWf/EABcRAAMBAAAAAAAAAAAAAAAAAAABAxP/2gAIAQMBAT8BwHEVB0P/xAAbEQACAQUAAAAAAAAAAAAAAAAAAQMCBBFBYf/aAAgBAgEBPwFzin6VwZ2K3P/EAB8QAAICAgEFAAAAAAAAAAAAAAABESECEAMSIDFBof/aAAgBAQAGPwLsa5V1v0ySci8vhL1WVEyymeXqnKP/xAAeEAEAAgEEAwAAAAAAAAAAAAABABEhQWFxgTFRkf/aAAgBAQABPyHbgYxtxmRWCiaURKgV6jBy1dCWALK2IIFtcMBzetB8dSp9ADNBe4lUmiu+ZZ8wT//aAAwDAQACAAMAAAAQi2WV/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQARQWH/2gAIAQMBAT8QMG5eMIYkPL//xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAECAQE/ENHFgivSacXt/8QAHRABAQACAgMBAAAAAAAAAAAAAREAITGBQVGhcf/aAAgBAQABPxDUXEnGEHGIDgMiC5d+GAJlzkmx94AsUNlfmJDinVAGCt+FDvDSUeGPmXF86h7DZj9wTRCfMcbN1S7lYlQ0mqYoDsj7d3xjU4RBpZn/2Q==';
        await fs.writeFile(file, Buffer.from(b64, 'base64'));

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        expect(await fileHandler.readFile(file, 'base64')).toStrictEqual(b64);
    });

    it('can read text files as utf8 strings', async () => {
        const file = path.join(testdir, 'readutf8');
        const utf8 = 'Test file contents.';
        await fs.writeFile(file, utf8, 'utf8');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        expect(await fileHandler.readFile(file, 'utf8')).toStrictEqual(utf8);
    });

    it('can remove empty directories', async () => {
        const dir = path.join(testdir, 'removedirempty');
        await fs.mkdir(dir);

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.removeDir(dir);

        expect(await fs.readdir(testdir)).not.toContain(path.basename(dir));
    });

    it('can remove full directories', async () => {
        const dir = path.join(testdir, 'removedirfull');
        await fs.mkdir(dir);
        await Promise.all(
            [1, 2, 3].map(i => fs.writeFile(path.join(dir, uuid()), ''))
        );

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.removeDir(dir, true);

        expect(await fs.readdir(testdir)).not.toContain(path.basename(dir));
    });

    it('can remove files', async () => {
        const file = path.join(testdir, 'removefile.txt');
        await fs.writeFile(file, '');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.removeFile(file);

        expect(await fs.readdir(testdir)).not.toContain(path.basename(file));
    });

    it('can save json files', async () => {
        const data = {
            'test_key': 'test value'
        };
        const file = path.join(testdir, 'savejson.json');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.saveFile(file, data, 'json');

        const jsonParser = services.get('JSONParser');
        expect(jsonParser.parse(await fs.readFile(file, 'utf8'))).toHaveProperty('test_key', 'test value');
    });

    it('can save json files and make new directories', async () => {
        const data = {
            'test_key': 'test value'
        };
        const file = path.join(testdir, 'savejsondir', 'savejson.json');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.saveFile(file, data, 'json');

        const jsonParser = services.get('JSONParser');
        expect(jsonParser.parse(await fs.readFile(file, 'utf8'))).toHaveProperty('test_key', 'test value');
    });

    it.skip('can save xml files', async () => {
        // Skip XML testing because frankly,
        // I'm not sure what the data structure is supposed to look like.
    });

    it('can write content to file handles', async () => {
        const file = path.join(testdir, 'writefile');
        const contents = [
            'line 1',
            'line 2',
            'line 3'
        ];
        const f = await fs.open(file, 'w');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.write(f, contents[0]);
        await fileHandler.write(f, contents[1]);
        await fileHandler.write(f, contents[2]);

        f.close();

        expect(await fs.readFile(file, 'utf8')).toStrictEqual(contents.join(''));
    });

    it('can write content lines to file handles', async () => {
        const file = path.join(testdir, 'writefileln');
        const contents = [
            'line 1',
            'line 2',
            'line 3'
        ];
        const f = await fs.open(file, 'w');

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.writeln(f, contents[0]);
        await fileHandler.writeln(f, contents[1]);
        await fileHandler.writeln(f, contents[2]);

        f.close();

        expect(await fs.readFile(file, 'utf8')).toStrictEqual(contents.join(os.EOL) + os.EOL);
    });

    it('can write binary files from base64 strings', async () => {
        const file = path.join(testdir, 'writeb64');
        const b64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFgAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAACAAAAADoAQAAQAAACAAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDIwNv/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIACAAIAMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYF/8QAGAEAAgMAAAAAAAAAAAAAAAAAAAECBAX/2gAMAwEAAhADEAAAAaU+BUuKgXgChtqFJn265TAAj//EABwQAAICAwEBAAAAAAAAAAAAAAECAAMEEhMFEf/aAAgBAQABBQIUThOENMw/Ts1S0OpvVQ2XQopsVQuWvx8iG8wMVnRp1YjfWf/EABcRAAMBAAAAAAAAAAAAAAAAAAABAxP/2gAIAQMBAT8BwHEVB0P/xAAbEQACAQUAAAAAAAAAAAAAAAAAAQMCBBFBYf/aAAgBAgEBPwFzin6VwZ2K3P/EAB8QAAICAgEFAAAAAAAAAAAAAAABESECEAMSIDFBof/aAAgBAQAGPwLsa5V1v0ySci8vhL1WVEyymeXqnKP/xAAeEAEAAgEEAwAAAAAAAAAAAAABABEhQWFxgTFRkf/aAAgBAQABPyHbgYxtxmRWCiaURKgV6jBy1dCWALK2IIFtcMBzetB8dSp9ADNBe4lUmiu+ZZ8wT//aAAwDAQACAAMAAAAQi2WV/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQARQWH/2gAIAQMBAT8QMG5eMIYkPL//xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAECAQE/ENHFgivSacXt/8QAHRABAQACAgMBAAAAAAAAAAAAAREAITGBQVGhcf/aAAgBAQABPxDUXEnGEHGIDgMiC5d+GAJlzkmx94AsUNlfmJDinVAGCt+FDvDSUeGPmXF86h7DZj9wTRCfMcbN1S7lYlQ0mqYoDsj7d3xjU4RBpZn/2Q==';

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.writeFile(file, b64, 'base64');

        const contents = Buffer.from(await fs.readFile(file, 'binary'), 'binary').toString('base64');
        expect(contents).toStrictEqual(b64);
    });

    it('can write binary files from base64 strings and make new directories', async () => {
        const file = path.join(testdir, 'writeb64dir', 'writeb64');
        const b64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFgAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAACAAAAADoAQAAQAAACAAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDIwNv/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIACAAIAMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYF/8QAGAEAAgMAAAAAAAAAAAAAAAAAAAECBAX/2gAMAwEAAhADEAAAAaU+BUuKgXgChtqFJn265TAAj//EABwQAAICAwEBAAAAAAAAAAAAAAECAAMEEhMFEf/aAAgBAQABBQIUThOENMw/Ts1S0OpvVQ2XQopsVQuWvx8iG8wMVnRp1YjfWf/EABcRAAMBAAAAAAAAAAAAAAAAAAABAxP/2gAIAQMBAT8BwHEVB0P/xAAbEQACAQUAAAAAAAAAAAAAAAAAAQMCBBFBYf/aAAgBAgEBPwFzin6VwZ2K3P/EAB8QAAICAgEFAAAAAAAAAAAAAAABESECEAMSIDFBof/aAAgBAQAGPwLsa5V1v0ySci8vhL1WVEyymeXqnKP/xAAeEAEAAgEEAwAAAAAAAAAAAAABABEhQWFxgTFRkf/aAAgBAQABPyHbgYxtxmRWCiaURKgV6jBy1dCWALK2IIFtcMBzetB8dSp9ADNBe4lUmiu+ZZ8wT//aAAwDAQACAAMAAAAQi2WV/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQARQWH/2gAIAQMBAT8QMG5eMIYkPL//xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAECAQE/ENHFgivSacXt/8QAHRABAQACAgMBAAAAAAAAAAAAAREAITGBQVGhcf/aAAgBAQABPxDUXEnGEHGIDgMiC5d+GAJlzkmx94AsUNlfmJDinVAGCt+FDvDSUeGPmXF86h7DZj9wTRCfMcbN1S7lYlQ0mqYoDsj7d3xjU4RBpZn/2Q==';

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.writeFile(file, b64, 'base64');

        const contents = Buffer.from(await fs.readFile(file, 'binary'), 'binary').toString('base64');
        expect(contents).toStrictEqual(b64);
    });

    it('can write text files from utf8 strings', async () => {
        const file = path.join(testdir, 'writeutf8');
        const utf8 = 'Test write contents.';

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.writeFile(file, utf8, 'utf8');

        const contents = await fs.readFile(file, 'utf8');
        expect(contents).toStrictEqual(utf8);
    });

    it('can write text files from utf8 strings and make new directories', async () => {
        const file = path.join(testdir, 'writeutf8dir', 'writeutf8');
        const utf8 = 'Test write contents.';

        const fileHandler = new LocalFileHandler(
            undefined as any,
            undefined as any
        ).init(services);

        await fileHandler.writeFile(file, utf8, 'utf8');

        const contents = await fs.readFile(file, 'utf8');
        expect(contents).toStrictEqual(utf8);
    });

    afterAll(async () => {
        await fs.rm(testdir, {
            force: true,
            maxRetries: 10,
            recursive: true,
            retryDelay: 100
        });
    });
});