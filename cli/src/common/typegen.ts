import path from 'path';
import { OptionalKind, MethodSignatureStructure } from 'ts-morph';
import services from 'services';

export const generateMethod = (name: string, parameters?: { [key: string]: string; }, returnType?: string): OptionalKind<MethodSignatureStructure> => ({
    name,
    parameters: parameters ? Object.keys(parameters).map(key => ({ name: key, type: parameters[key]})) : undefined,
    returnType
});

export const generatePackage = async (file: string): Promise<void> => {
    const fileHandler = services('FileHandler');
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
    await fileHandler.makeDir(path.dirname(file));
    await fileHandler.saveFile(file, pkg, 'json');
}