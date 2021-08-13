import ServiceBuilder, { ServiceCollection } from './serviceBuilder';

import Execute from './execute';
import FileHandler, { LocalFileHandler } from './fileHandler';
import JSONParser, { BigIntJSONParser } from './jsonParser';
import VarReplacer, { LocalVarReplacer } from './varReplacer';
import XMLParser, { XML2JSParser } from './xmlParser';

export {
    Execute,
    FileHandler,
    JSONParser,
    VarReplacer,
    XMLParser
}

const _appServices = ServiceBuilder
    .create()
    .addSingleton<JSONParser>(BigIntJSONParser)
    .addSingleton<FileHandler>(LocalFileHandler)
    .addSingleton<VarReplacer>(LocalVarReplacer)
    .addSingleton<XMLParser>(XML2JSParser)
    .addTransient<Execute>(Execute);

let _services: ServiceCollection | null = null;

/**
 * Initialize the service registry.
 * 
 * If `init()` is not called before the first call to `services()` is made,
 * the application will use the default service registry.
 * @param services Services to register.
 */
export const init = <T extends ServiceCollection>(services: T) => {
    _services = services
};

/**
 * Get the service registered with the given name.
 * @param name Service name.
 * @returns Service
 * @remarks Services are not initialized until the first call is made.
 */
const services: typeof _appServices.services.get = (name: string) => {
    if (!_services) {
        _services = _appServices.services;
    }
    return (_services as any).get(name);
};

export default services;