import path from 'path';
import { getExtension } from '../../components/webresource';
import { WebResourceType } from '../../types/entity/WebResource';
import { Service, ServiceCollection } from '../serviceBuilder';
import FileQuickReader from '../fileQuickReader';
import { ConfigFile, ConfigSettings, defaults, validate } from './generated';
import { ContentPaths, ProjectPaths } from './types';

export default interface Config extends Service<'Config', Config> {
    get content(): ContentPaths;
    get project(): ProjectPaths;
    get settings(): ConfigSettings;
}

export class LocalConfig implements Config {
    private readonly _configSettings: ConfigSettings;
    private readonly _content: ContentPaths;
    private readonly _project: ProjectPaths;
    public readonly name = 'Config';

    constructor (settings: ConfigSettings, contentPaths: ContentPaths, projectPaths: ProjectPaths) {
        this._configSettings = settings;
        this._content = contentPaths;
        this._project = projectPaths;
    }

    public get content(): ContentPaths {
        return this._content;
    }

    public get project(): ProjectPaths {
        return this._project;
    }

    public get settings(): Required<ConfigFile> {
        return this._configSettings;
    }

    public init = (services: ServiceCollection) => {
        const fileQuickReader: FileQuickReader = services.get('FileQuickReader');

        const configLocation = this._findConfigFile(fileQuickReader);
        const configFile = fileQuickReader.loadFile<ConfigFile>(configLocation, 'jsonc');

        validate(configFile);

        const configSettings = {
            ...defaults,
            ...configFile
        };

        const content = this._createContentPaths(configLocation, configSettings);
        const project = this._createProjectPaths(configLocation, configSettings);

        return new LocalConfig(configSettings, content, project);
    };

    private _createContentPaths = (configLocation: string, configSettings: ConfigSettings): ContentPaths => {
        const dir = path.resolve(path.dirname(configLocation));
        const root = path.join(dir, configSettings.rootDir);
        const assign = <T, U>(source: T, target: U) => Object.assign(target, source);
        const definition = (p: string) => path.join(p, 'definition.json');

        const typeDir = path.join(root, configSettings.typesDir);
        const types: ContentPaths['types'] = {
            directory: typeDir,
            package: path.join(typeDir, 'package.json')
        };

        const typedef = (p: string) => path.join(
            path.join(typeDir, path.relative(root, path.resolve(p))),
            'index.d.ts'
        );

        const entityDir = path.join(root, 'entities');
        const entities: ContentPaths['entities'] = assign(
            {
                directory: entityDir,
                typedef: typedef(entityDir)
            },
            (name: string) => {
                const entityNamedDir = path.join(root, 'entities', name);
                const attributeDir = path.join(entityNamedDir, 'attributes');
                const systemFormDir = path.join(entityNamedDir, 'systemforms');
                return {
                    directory: entityNamedDir,
                    definition: definition(entityNamedDir),
                    metadata: path.join(entityNamedDir, 'metadata.json'),
                    typedef: typedef(entityNamedDir),
                    attributes: assign(
                        {
                            directory: attributeDir,
                        },
                        (name: string) => {
                            const attributeNamedDir = path.join(attributeDir, name);
                            return {
                                directory: attributeNamedDir,
                                definition: definition(attributeNamedDir),
                                typedef: typedef(attributeNamedDir)
                            };
                        }
                    ),
                    systemForms: assign(
                        {
                            directory: systemFormDir
                        },
                        (name: string, type: string) => {
                            const systemFormNamedDir = path.join(systemFormDir, name, type);
                            return {
                                directory: systemFormNamedDir,
                                definition: definition(systemFormNamedDir),
                                form: path.join(systemFormNamedDir, `form.${configSettings.systemFormFormat}`),
                                typedef: typedef(systemFormNamedDir)
                            };
                        }
                    )
                };
            }
        );

        const pluginAssemblyDir = path.join(root, 'pluginassemblies');
        const pluginAssemblies: ContentPaths['pluginAssemblies'] = assign(
            {
                directory: pluginAssemblyDir
            },
            (name: string) => {
                const pluginAssemblyNamedDir = path.join(pluginAssemblyDir, name);
                return {
                    directory: pluginAssemblyNamedDir,
                    content: path.join(pluginAssemblyNamedDir, 'content.dll'),
                    definition: definition(pluginAssemblyNamedDir)
                };
            }
        );

        const solutionDir = path.join(root, 'solutions');
        const solutions: ContentPaths['solutions'] = assign(
            {
                directory: solutionDir
            },
            (name: string) => {
                return {
                    directory: solutionDir,
                    definition: path.join(solutionDir, `${name}.json`)
                };
            }
        );

        const webResourceDir = path.join(root, 'webresources');
        const webResources: ContentPaths['webResources'] = assign(
            {
                directory: webResourceDir
            },
            (name: string, type?: WebResourceType): any => {
                const webResourceNamedDir = path.join(webResourceDir, name);
                return type ? {
                    directory: webResourceNamedDir,
                    content: path.join(webResourceNamedDir, 'content.' + getExtension({ webresourcetype: type })),
                    definition: definition(webResourceNamedDir)
                } : {
                    directory: webResourceNamedDir,
                    definition: definition(webResourceNamedDir)
                };
            }
        );

        return {
            root,
            entities,
            pluginAssemblies,
            solutions,
            types,
            webResources
        };
    }

    private _createProjectPaths = (configLocation: string, configSettings: ConfigSettings): ProjectPaths => {
        const dir = path.resolve(path.dirname(configLocation));

        const root = dir;
        const cache = {
            directory: path.join(dir, '.xrm'),
            token: path.join(dir, '.xrm', 'id')
        };
        const pluginAssemblies = {
            directory: path.join(dir, configSettings.pluginAssembliesDir)
        };
        const webResources = {
            directory: path.join(dir, configSettings.webResourcesDir)
        };

        return {
            root,
            cache,
            pluginAssemblies,
            webResources
        };
    }

    private _findConfigFile = (fileQuickReader: FileQuickReader): string => {
        const cwd = process.cwd();
        const find = (p: string): string => {
            const f = path.join(p, 'xrm.jsonc');
            if (fileQuickReader.exists(f)) {
                return f;
            }
            else {
                const d = path.dirname(path.resolve(p));
                const r = path.resolve('/');
                if (d !== r && fileQuickReader.exists(d)) {
                    return find(d);
                }
                else {
                    throw 'Failed to load xrm.jsonc';
                }
            }
        }
        return find(cwd);
    }
}