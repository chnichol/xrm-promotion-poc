import JSONBigInt from 'json-bigint';
import { Service } from './serviceBuilder';

export default interface JSONParser extends Service<'JSONParser', JSONParser> {
    parse<T>(text: string): T;
    stringify<T>(value: T, pretty?: boolean): string;
}

export class BigIntJSONParser implements JSONParser {
    private readonly _jsonBigInt = JSONBigInt({ useNativeBigInt: true });
    public readonly name = 'JSONParser';

    public init = () => new BigIntJSONParser();
    public parse = <T>(text: string) => this._jsonBigInt.parse(text) as T
    public stringify = <T>(value: T, pretty?: boolean) => this._jsonBigInt.stringify(value, undefined, pretty ? 2 : undefined);
}

export class SystemJSONParser implements JSONParser {
    public readonly name = 'JSONParser';

    public init = () => new SystemJSONParser();
    public parse = <T>(text: string) => JSON.parse(text) as T;
    public stringify = <T>(value: T, pretty?: boolean) => JSON.stringify(value, undefined, pretty ? 2 : undefined);
}