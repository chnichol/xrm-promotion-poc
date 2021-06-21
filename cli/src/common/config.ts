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
        root: string;
        solutions: string[];
    };
    urls: {
        home: string;
        port: number;
        redirect: string;
    };
}

export const getConfig = (): Promise<Config> => new Promise<Config>(resolve => {
    fs.readFile('./xrmconfig.jsonc', 'utf8').then(data => resolve(parse(data) as Config));
});

export const getPath = (config: Config) => ({
    entities: path.join(config.project.root, 'entities'),
    entity: (entity: { logicalname: string }) => ({
        attributes: path.join(config.project.root, 'entities', entity.logicalname, 'attributes.json'),
        directory: path.join(config.project.root, 'entities', entity.logicalname),
        definition: path.join(config.project.root, 'entities', entity.logicalname, 'definition.json'),
        metadata: path.join(config.project.root, 'entities', entity.logicalname, 'metadata.json')
    }),
    solutions: path.join(config.project.root, 'solutions'),
    solution: (solution: { uniquename: string }) => path.join(config.project.root, 'solutions', solution.uniquename + '.json'),
    webresources: path.join(config.project.root, 'webresources'),
    webresource: (webresource: { name: string, webresourcetype?: WebResourceType }) => ({
        content: webresource.webresourcetype ? path.join(config.project.root, 'webresources', webresource.name, 'content.' + getExtension(webresource as any)) : undefined,
        directory: path.join(config.project.root, 'webresources', webresource.name),
        definition: path.join(config.project.root, 'webresources', webresource.name, 'definition.json'),
    })
})

export const saveConfig = (config: Config): Promise<void> => fs.writeFile('./xrmconfig.jsonc', JSON.stringify(config, undefined, 4), 'utf8')