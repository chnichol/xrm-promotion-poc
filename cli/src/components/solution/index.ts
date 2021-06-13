import fs from 'fs/promises';
import path from 'path';
import { parseFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import Solution from './types';

export const getProjectSolutionFiles = async (names?: string[]): Promise<string[]> => {
    const config = await getConfig();
    const folder = getPath(config).solutions;
    const dir = await fs.readdir(folder);
    const files = dir.map(f => path.join(folder, f));
    if (names && names.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const solution = await parseFile<Solution>(files[i]);
            if (!names.find(n => n === solution.solutionid || n === solution.uniquename)) {
                files.splice(i, 1);
                i--;
            }
        }
    }
    return files;
}

export const getProjectSolutions = async (names?: string[]): Promise<Solution[]> => {
    const files = await getProjectSolutionFiles(names);
    return Promise.all(files.map(f => parseFile<Solution>(f)));
}

/*
interface SolutionComponentDictionary {
    [key: string]: SolutionComponent;
}

export const getProjectSolutionComponents = async (files: string[]): Promise<SolutionComponentDictionary> => {
    const components: { [key: string]: SolutionComponent; } = {};
    for (let i = 0; i < files.length; i++) {
        const json = JSON.parse(await fs.readFile(files[i], 'utf8'));
        (json.solutioncomponents as SolutionComponent[]).forEach(c => {
            if (!components[c.objectid]) {
                components[c.objectid] = c;
            }
        });
    }
    return components;
}

export const getWebSolutionComponents = async (names: string[]): Promise<SolutionComponentDictionary> => {
    const components: SolutionComponentDictionary = {};
    for (let i = 0; i < names.length; i++) {
        const solution = await getSolution(names[i]);
        (solution.solutioncomponents as SolutionComponent[]).forEach(c => {
            if (!components[c.objectid]) {
                components[c.objectid] = c;
            }
        });
    }
    return components;
}
*/