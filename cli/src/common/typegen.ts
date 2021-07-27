import fs from 'fs/promises';
import path from 'path';
import { OptionalKind, MethodSignatureStructure } from 'ts-morph';
import { mkdir } from '.';

export const generateMethod = (name: string, parameters?: { [key: string]: string; }, returnType?: string): OptionalKind<MethodSignatureStructure> => ({
    name,
    parameters: parameters ? Object.keys(parameters).map(key => ({ name: key, type: parameters[key]})) : undefined,
    returnType
});

export const generatePackage = async (file: string) => {
    const pkg = {
        name: '@types/xrm-generated',
        version: '1.0.0',
        description: '',
        scripts: {},
        author: 'Microsoft',
        license: 'MIT',
        devDependencies: {},
        dependencies: {}
    };
    await mkdir(path.dirname(file));
    await fs.writeFile(file, JSON.stringify(pkg, undefined, 2));
}