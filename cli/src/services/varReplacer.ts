import path from 'path';
import { Config, FileQuickReader } from '.';
import { Service, ServiceCollection } from './serviceBuilder';

export default interface VarReplacer extends Service<'VarReplacer', VarReplacer> {
    replace(content: string): string;
}

type VarFile = {
    [key: string]: string | VarFile;
}

/**
 * Var replacer that loads its variables from the local filesystem.
 */
export class LocalVarReplacer implements VarReplacer {
    private readonly _varMap: ReadonlyMap<string, string> = new Map<string, string>();
    public readonly name = 'VarReplacer';

    constructor (varMap: ReadonlyMap<string, string>) {
        this._varMap = varMap;
    }

    public init = (services: ServiceCollection) => {
        const config: Config = services.get('Config');
        const fileQuickReader: FileQuickReader = services.get('FileQuickReader');

        const root = config.project.root;
        const paths = [path.join(root, 'vars.json'), path.join(root, 'secrets.json')];
        const files = paths.map(p => fileQuickReader.loadFile<VarFile>(p, 'json'));
        const varMap = this._createVarMap(files);

        return new LocalVarReplacer(varMap);
    };

    public replace = (content: string) => {
        // Regex that matches text in handlebars syntax.
        // The internal text is only allowed to include
        // alphabetic characters seperated by dots.
        const tokenRegex = /{{\w+(\.\w+)*}}/g;
        const tokens = content.match(tokenRegex);
        if (tokens && tokens.length) {
            tokens.forEach(token => {
                // Convert the token name to a regex expression.
                const nameRegex = new RegExp(token.replace(/\./g, '\\.'));
                const replacement = this._getVar(token);
                content = content.replace(nameRegex, replacement);
            });
        }
        return content;
    };

    private _createVarMap = (files: VarFile[]) => {
        const flatten = (file: VarFile, prefix?: string): VarFile => {
            if (file === Object(file)) {
                let result: VarFile = {};
                Object.keys(file).forEach(key => {
                    const property = flatten(file[key] as VarFile, prefix ? `${prefix}.${key}` : key)
                    result = { ...result, ...property };
                });
                return result;
            }
            else {
                const result: VarFile = {};
                if (prefix) {
                    result[prefix] = file;
                }
                return result;
            }
        };
    
        let vars: any = {};
        files.forEach(
            f => vars = {
                ...vars,
                ...flatten(f)
            }
        );

        // Wrap the key in handlebars since that's how it'll be looked up.
        return new Map<string, string>(Object.keys(vars).map(k => [`{{${k}}}`, vars[k]]));
    };

    private _getVar = (key: string) => {
        const val = this._varMap.get(key);
        if (!val) {
            throw `No variable found with key "${path}"`;
        }
        return val;
    }
}