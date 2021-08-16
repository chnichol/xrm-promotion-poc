import fs from 'fs';
import { JSONParser, XMLParser } from '.';
import { Service, ServiceCollection } from './serviceBuilder';

export default interface FileQuickReader extends Service<'FileQuickReader', FileQuickReader> {
    exists(p: string): boolean;
    loadFile<T>(p: string, format: 'json'): T;
    readFile(p: string, format: 'base64' | 'utf8'): string;
}

export class LocalFileQuickReader implements FileQuickReader {
    private readonly _jsonParser: JSONParser;
    public readonly name = 'FileQuickReader';

    constructor (jsonParser: JSONParser) {
        this._jsonParser = jsonParser;
    }

    public init = (services: ServiceCollection) => new LocalFileQuickReader(
        services.get('JSONParser')
    );

    public exists = (p: string) => fs.existsSync(p);

    public loadFile = <T>(p: string, format: 'json') => this._jsonParser.parse<T>(fs.readFileSync(p, 'utf8'));

    public readFile = (p: string, format: 'base64' | 'utf8') =>
        format === 'base64'
            ? Buffer.from(fs.readFileSync(p, 'binary'), 'binary').toString('base64')
            : fs.readFileSync(p, 'utf8');
}