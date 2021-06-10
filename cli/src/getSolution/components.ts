import fs from 'fs/promises';
import { SolutionComponent, SolutionComponentType } from '../types';
import getSolution from '.';

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