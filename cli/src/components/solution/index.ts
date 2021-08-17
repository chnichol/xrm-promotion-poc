import path from 'path';
import services from 'services';
import Solution from 'types/entity/Solution';

export const getProjectSolutionFiles = async (names?: string[]): Promise<string[]> => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const folder = config.content.solutions.directory;
    const dir = await fileHandler.readDir(folder);
    const files = dir.map(f => path.join(folder, f));
    if (names && names.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const solution = await fileHandler.loadFile<Solution>(files[i], 'json');
            if (!names.find(n => n === solution.solutionid || n === solution.uniquename)) {
                files.splice(i, 1);
                i--;
            }
        }
    }
    return files;
}

export const getProjectSolutions = async (names?: string[]): Promise<Solution[]> => {
    const fileHandler = services('FileHandler');
    const files = await getProjectSolutionFiles(names);
    return Promise.all(files.map(f => fileHandler.loadFile<Solution>(f, 'json')));
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