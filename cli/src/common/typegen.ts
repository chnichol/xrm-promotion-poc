import fs from 'fs/promises';
import path from 'path';
import { mkdir } from '.';

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