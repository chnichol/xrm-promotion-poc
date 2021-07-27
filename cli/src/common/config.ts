import fs from 'fs/promises';
import path from 'path';
import { parse } from 'jsonc-parser';
import { getExtension } from '../components/webresource';
import { WebResourceType } from '../types/entity/WebResource';

export default interface Config {
    auth: {
        authority: string;
        clientId: string;
    };
    dynamics: string;
    project: {
        forms: 'json' | 'xml';
        root: string;
        solutions: string[];
        types: string;
        pluginassemblies: string;
        webresources: string;
    };
    urls: {
        home: string;
        port: number;
        redirect: string;
    };
}

export const getConfig = (): Promise<Config> => new Promise<Config>(resolve => {
    fs.readFile('./xrm.json', 'utf8').then(data => resolve(parse(data) as Config));
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPath = (config: Config) => ({
    attributes: (entity: string) => path.join(config.project.root, 'entities', entity, 'attributes'),
    attribute: (entity: string, attribute: string) => ({
        directory: path.join(config.project.root, 'entities', entity, 'attributes', attribute),
        definition: path.join(config.project.root, 'entities', entity, 'attributes', attribute, 'definition.json'),
        typedef: path.join(config.project.types, 'entities', entity, 'attributes', attribute, 'index.d.ts')
    }),
    entities: {
        directory: path.join(config.project.root, 'entities'),
        typedef: path.join(config.project.types, 'entities', 'index.d.ts')
    },
    entity: (entity: { logicalname: string }) => ({
        directory: path.join(config.project.root, 'entities', entity.logicalname),
        definition: path.join(config.project.root, 'entities', entity.logicalname, 'definition.json'),
        metadata: path.join(config.project.root, 'entities', entity.logicalname, 'metadata.json'),
        typedef: path.join(config.project.types, 'entities', entity.logicalname, 'index.d.ts')
    }),
    solutions: path.join(config.project.root, 'solutions'),
    solution: (solution: { uniquename: string }) => path.join(config.project.root, 'solutions', solution.uniquename + '.json'),
    systemforms: (entity: string) => path.join(config.project.root, 'entities', entity, 'forms'),
    systemform: (entity: string, name: string, type: string) => ({
        definition: path.join(config.project.root, 'entities', entity, 'forms', name, type, 'definition.json'),
        directory: path.join(config.project.root, 'entities', entity, 'forms', name, type),
        form: path.join(config.project.root, 'entities', entity, 'forms', name, type, `form.${config.project.forms}`),
        typedef: path.join(config.project.types, 'entities', entity, 'forms', name, type, 'index.d.ts')
    }),
    types: {
        package: path.join(config.project.types, 'package.json')
    },
    webresources: path.join(config.project.root, 'webresources'),
    webresource: (webresource: { name: string, webresourcetype?: WebResourceType }) => ({
        content: webresource.webresourcetype ? path.join(config.project.root, 'webresources', webresource.name, 'content.' + getExtension({ webresourcetype: webresource.webresourcetype })) : undefined,
        directory: path.join(config.project.root, 'webresources', webresource.name),
        definition: path.join(config.project.root, 'webresources', webresource.name, 'definition.json'),
        typedef: path.join(config.project.types, 'webresources', webresource.name, 'index.d.ts')
    }),
    pluginassemblies: path.join(config.project.root, 'pluginassemblies'),
    pluginassembly: (name: string) => ({
        content: path.join(config.project.root, 'pluginassemblies', name, 'content.dll'),
        definition: path.join(config.project.root, 'pluginassemblies', name, 'definition.json'),
        directory: path.join(config.project.root, 'pluginassemblies', name)
    })
})

export const saveConfig = (config: Config): Promise<void> => fs.writeFile('./xrmconfig.jsonc', JSON.stringify(config, undefined, 4), 'utf8')