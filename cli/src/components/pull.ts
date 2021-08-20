import { isUuid, quote } from 'helpers';
import services from 'services';
import { ApiBuilder } from 'services/api/builders';

type Keys<T> = {
    id: keyof T;
    name: keyof T;
};

type Extraction<P, L> = {
    key: keyof(P & L);
    path: (location: string) => string;
    serializer: (value: (P & L)) => string;
};

const query = async <P, L, S, C>(api: ApiBuilder<P, L, S, C>, keys: Keys<P>, name: string) => {
    const property = isUuid(name) ? keys.id : keys.name;
    const filter: any = {};
    filter[property] = quote(name);
    const results = await api.query({ filter }).execute();
    switch (results.length) {
        case 0: {
            throw new Error(`No results found where ${property}="${name}"`);
        }
        case 1: {
            return results[0];
        }
        default: {
            throw new Error(`Multiple results found where ${property}="${name}"`);
        }
    }
};

const save = async <P, L>(location: string, value: P & L, extractions: Extraction<P, L>[]) => {
    const { saveFile, writeFile } = services('FileHandler');
    const definition: Partial<P & L> = value;
    extractions.forEach(e => {
        definition[e.key] = undefined;
    });
    await Promise.all([
        saveFile(location, definition, 'json'),
        ...extractions.map(e => writeFile(e.path(location), e.serializer(value), 'utf8'))
    ]);
};

const pull = async <P, L, S, C>(api: ApiBuilder<P, L, S, C>, keys: Keys<P>, name: string, location: string, extractions: Extraction<P, L>[]) => {
    const value: P & L = await query(api, keys, name);
    await save<P, L>(location, value, extractions);
}

export default pull;