import fs from 'fs';
import path from 'path';
import { parse } from 'jsonc-parser';
import { getExtension } from '../components/webresource';
import { WebResourceType } from '../types/entity/WebResource';
import { ConfigFile, ConfigSettings, defaults, validate } from './generated';
import { ContentPaths, ProjectPaths } from './types';

class Config {
    private readonly _configFile: ConfigFile;
    private readonly _configLocation: string;
    private readonly _configSettings: ConfigSettings;
    private readonly _content: ContentPaths;
    private readonly _project: ProjectPaths;

    constructor() {
        this._configLocation = this._findConfigFile();
        this._configFile = parse(fs.readFileSync(this._configLocation, 'utf8'));

        validate(this._configFile);

        this._configSettings = {
            ...defaults,
            ...this._configFile
        };

        this._content = this._createContentPaths();
        this._project = this._createProjectPaths();
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

    private _createContentPaths = (): ContentPaths => {
        const dir = path.resolve(path.dirname(this._configLocation));
        const root = path.join(dir, this._configSettings.rootDir);
        const assign = <T, U>(source: T, target: U) => Object.assign(target, source);
        const definition = (p: string) => path.join(p, 'definition.json');
        const typedef = (p: string) => path.join(p, 'index.d.ts');

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
                    typedef: definition(entityNamedDir),
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
                                form: path.join(systemFormNamedDir, `form.${this._configSettings.systemFormFormat}`),
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

        const typeDir = path.resolve(this._configSettings.typesDir);
        const types: ContentPaths['types'] = {
            directory: typeDir,
            package: path.join(typeDir, 'package.json')
        };

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

    private _createProjectPaths = (): ProjectPaths => {
        const dir = path.resolve(path.dirname(this._configLocation));

        const root = dir;
        const cache = {
            directory: path.join(dir, '.xrm'),
            token: path.join(dir, '.xrm', 'id')
        };
        const pluginAssemblies = {
            directory: path.join(dir, this._configSettings.pluginAssembliesDir)
        };
        const webResources = {
            directory: path.join(dir, this._configSettings.webResourcesDir)
        };

        return {
            root,
            cache,
            pluginAssemblies,
            webResources
        };
    }

    private _findConfigFile = (): string => {
        const cwd = process.cwd();
        const find = (p: string): string => {
            const f = path.join(p, 'xrm.json');
            if (fs.existsSync(f)) {
                return f;
            }
            else {
                const d = path.dirname(path.resolve(p));
                const r = path.resolve('/');
                if (d !== r && fs.existsSync(d)) {
                    return find(d);
                }
                else {
                    throw 'Failed to load xrm.json';
                }
            }
        }
        return find(cwd);
    }
}
let _config: Config;
const config = () => {
    if (_config) {
        return _config;
    }
    else {
        _config = new Config();
        return _config;
    }
}
export default config;