import { WebResourceType } from '../types/entity/WebResource';

export interface ContentPaths {
    readonly root: string;
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

export interface ProjectPaths {
    readonly root: string;
    readonly cache: {
        readonly directory: string;
        readonly token: string;
    };
    readonly pluginAssemblies: {
        readonly directory: string;
    }
    readonly webResources: {
        readonly directory: string;
    }
}