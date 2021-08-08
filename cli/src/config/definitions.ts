import os from 'os';
import { InterfaceDeclarationStructure, OptionalKind, PropertySignatureStructure, VariableDeclarationKind, VariableStatementStructure } from 'ts-morph';
import schema, { SchemaProperty } from './schema';

const prop = (property: SchemaProperty): OptionalKind<PropertySignatureStructure> => ({
    name: property.name,
    type: property.type === 'array' ? 'string[]' : property.type,
    docs: [property.description],
    hasQuestionToken: !property.required
});

export const defaultsObject: OptionalKind<VariableStatementStructure> = {
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{
        name: 'defaults',
        type: 'ConfigSettings',
        initializer: (() => {
            let initializer = `{${os.EOL}`;
            schema.groups.map(
                (g, gi, ga) => g.properties.map(
                    (p, pi, pa) => {
                        let value = '';
                        switch (p.type) {
                            case 'array': {
                                const arr = p.value as string[];
                                value = arr.length ? `['${arr.join("', '")}']` : '[]';
                                break;
                            }
                            case 'number':
                                value = p.value.toString();
                                break;
                            default:
                                value = `'${p.value}'`;
                                break;
                        }
                        initializer += `    ${p.name}: ${value}${(gi === ga.length - 1 && pi === pa.length - 1) ? '' : ','}${os.EOL}`
                    }
                )
            );
            initializer += '}';
            return initializer;
        })()
    }]
}

export const fileInterface: OptionalKind<InterfaceDeclarationStructure> = {
    name: 'ConfigFile',
    isExported: true,
    properties: schema.groups.map(
        g => g.properties.map(
            p => Object.assign({}, prop(p), { hasQuestionToken: true })
        )
    ).reduce((acc, val) => acc.concat(val), [])
};

export const settingsInterface: OptionalKind<InterfaceDeclarationStructure> = {
    name: 'ConfigSettings',
    isExported: true,
    extends: ['Required<ConfigFile>']
};

export const validateFunction: OptionalKind<VariableStatementStructure> = {
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{
        name: 'validate',
        initializer: (() => {
            let initializer = `(config: ConfigFile): void => {${os.EOL}`;
            initializer += '    const msg = (key: string) => `Configuration file missing required key "${key}"`;' + os.EOL;
            schema.groups.forEach(
                g => g.properties.forEach(
                    p => {
                        if (p.required) {
                            initializer += `    if (!config.${p.name}) {${os.EOL}`;
                            initializer += `        throw msg('${p.name}');${os.EOL}`;
                            initializer += `    }${os.EOL}`;
                        }
                    }
                )
            )
            initializer += '}'
            return initializer;
        })()
    }]
}