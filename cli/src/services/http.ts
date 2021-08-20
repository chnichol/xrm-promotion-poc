import axios from 'axios';
import services, { JSONParser } from '.';
import { Service, ServiceCollection } from './serviceBuilder';

export default interface HTTP extends Service<'HTTP', HTTP> {
    get<T>(url: string, headers?: any): Promise<T>;
    patch<T>(url: string, data: Partial<T>, headers?: any): Promise<void>;
    post<T>(url: string, data: T, headers?: any): Promise<T>;
    put<T>(url: string, data: T, headers?: any): Promise<void>;
}

export class AxiosHTTP implements HTTP {
    private readonly _jsonParser: JSONParser;
    public readonly name = 'HTTP';

    constructor (jsonParser: JSONParser) {
        this._jsonParser = jsonParser;
    }

    public init = (services: ServiceCollection) => new AxiosHTTP(services.get('JSONParser'));

    public get = async <T>(url: string, headers?: any) => {
        const response = await axios.get(url, { headers, transformResponse: [data => data]});
        return this._jsonParser.parse<T>(response.data);
    }

    public patch = <T>(url: string, data: Partial<T>, headers?: any) => axios.patch(url, this._jsonParser.stringify(data), { headers }) as Promise<void>;

    public post = <T>(url: string, data: T, headers?: any) => axios.post(url, this._jsonParser.stringify(data), { headers }) as Promise<T>;

    public put = <T>(url: string, data: T, headers?: any) => axios.put(url, this._jsonParser.stringify(data), { headers }) as Promise<void>;

    
}