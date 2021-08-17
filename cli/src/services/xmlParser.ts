import xml2js from 'xml2js';
import { Service } from './serviceBuilder';

export default interface XMLParser extends Service<'XMLParser', XMLParser> {
    parse<T>(text: string): Promise<T>;
    stringify<T>(value: T): string;
}

export class XML2JSParser implements XMLParser {
    private readonly _xmlBuilder = new xml2js.Builder();
    private readonly _xmlParser = new xml2js.Parser();
    public readonly name = 'XMLParser';

    public init = () => new XML2JSParser();

    public parse = async <T>(text: string) => await this._xmlParser.parseStringPromise(text) as T;

    public stringify = <T>(value: T) => this._xmlBuilder.buildObject(value);
}