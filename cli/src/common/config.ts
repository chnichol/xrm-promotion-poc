import fs from 'fs';
import path from 'path';
import { parse } from 'jsonc-parser';
import { getExtension } from '../components/webresource';
import { WebResourceType } from '../types/entity/WebResource';

type ConfigFile = Partial<{
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
}>

type Paths = {
    readonly root: string;
    readonly cache: {
        readonly directory: string;
        readonly token: string;
    };
    readonly entities: {
        readonly directory: string;
        readonly typedef: string;
        (name: string): {
            readonly directory: string;
            readonly definition: string;
            readonly metadata: string;
            readonly typedef: string;
            readonly attributes: {
                readonly directory: string;
                (name: string): {
                    readonly directory: string;
                    readonly definition: string;
                    readonly typedef: string;
                };
            };
            readonly systemForms: {
                readonly directory: string;
                (name: string, type: string): {
                    readonly directory: string;
                    readonly definition: string;
                    readonly form: string;
                    readonly typedef: string;
                };
            };
        };
    };
    readonly pluginAssemblies: {
        readonly directory: string;
        (name: string): {
            readonly directory: string;
            readonly content: string;
            readonly definition: string;
        };
    };
    readonly solutions: {
        readonly directory: string;
        (name: string): {
            readonly directory: string;
            readonly definition: string;
        };
    };
    readonly types: {
        readonly directory: string;
        readonly package: string;
    };
    readonly webResources: {
        readonly directory: string;
        (name: string): {
            readonly directory: string;
            readonly definition: string;
        };
        (name: string, type: WebResourceType): {
            readonly directory: string;
            readonly content: string;
            readonly definition: string;
        };
    };
}

const defaults: Required<ConfigFile> = {
    auth: {
        authority: '',
        clientId: ''
    },
    dynamics: '',
    project: {
        forms: 'json',
        pluginassemblies: 'pluginassemblies',
        root: 'xrm',
        solutions: [],
        types: 'xrm/types',
        webresources: 'webresources'
    },
    urls: {
        home: 'http://localhost:3000',
        port: 3000,
        redirect: 'http://localhost:3000/redirect'
    }
}

class Config {
    private readonly _configFile: ConfigFile;
    private readonly _configLocation: string;
    private readonly _configSettings: Required<ConfigFile>;
    private readonly _paths: Paths;

    constructor () {
        this._configLocation = this._findConfigFile();
        this._configFile = parse(fs.readFileSync(this._configLocation, 'utf8'));

        this._validateRequiredKeys();

        this._configSettings = {
            ...defaults,
            ...this._configFile
        };

        this._paths = this._createPaths();
    }

    public get paths(): Paths {
        return this._paths;
    }

    public get settings(): Required<ConfigFile> {
        return this._configSettings;
    }

    private _createPaths = () => {
        const dir = path.resolve(path.dirname(this._configLocation));
        const root = path.join(dir, this._configSettings.project.root);
        const assign = <T, U>(source: T, target: U) => Object.assign(target, source);
        const definition = (p: string) => path.join(p, 'definition.json');
        const typedef = (p: string) => path.join(p, 'index.d.ts');

        const cacheDir = path.join(dir, '.xrm');
        const cache: Paths['cache'] = {
            directory: cacheDir,
            token: path.join(cacheDir, 'id')
        };

        const entityDir = path.join(root, 'entities');
        const entities: Paths['entities'] = assign(
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
                                form: path.join(systemFormNamedDir, `form.${this._configSettings.project.forms}`),
                                typedef: typedef(systemFormNamedDir)
                            };
                        }
                    )
                };
            }
        );

        const pluginAssemblyDir = path.join(root, 'pluginassemblies');
        const pluginAssemblies: Paths['pluginAssemblies'] = assign(
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
        const solutions: Paths['solutions'] = assign(
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

        const typeDir = path.resolve(this._configSettings.project.types);
        const types: Paths['types'] = {
            directory: typeDir,
            package: path.join(typeDir, 'package.json')
        };

        const webResourceDir = path.join(root, 'webresources');
        const webResources: Paths['webResources'] = assign(
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

        const paths: Paths = {
            root,
            cache,
            entities,
            pluginAssemblies,
            solutions,
            types,
            webResources
        };
        return paths;
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

    private _validateRequiredKeys = (): void => {
        const msg = (key: string) => `Configuration missing required key "${key}"`;

        // Validate connection settings.
        if (!this._configFile.auth) {
            throw msg('auth');
        }
        if (!this._configFile.auth.authority) {
            throw msg('auth.authority');
        }
        if (!this._configFile.auth.clientId) {
            throw msg('auth.clientId');
        }
        if (!this._configFile.dynamics) {
            throw msg('dynamics');
        }
    }
}

const config = new Config();
export default config;