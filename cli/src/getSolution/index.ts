import fs from 'fs/promises';
import path from 'path';
import { lookup, query } from '../api';
import { isUuid } from '../common';
import { getConfig } from '../common/config';

interface Options {
    outdir?: string;
}

const getProjectSolutions = async (names?: string[]): Promise<string[]> => {
    const config = await getConfig();
    if (config.project.root) {
        const folder = path.join(config.project.root, 'solutions');
        const dir = await fs.readdir(folder);
        const files = dir.map(f => path.join(folder, f));
        if (names && names.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const solution = JSON.parse(await fs.readFile(files[i], 'utf8'));
                if (!names.find(n => n === solution.solutionid || n === solution.uniquename)) {
                    files.splice(i, 1);
                    i--;
                }
            }
        }
        return files;
    }
    return [];
}

const saveSolution = async (outdir: string, solution: any) => {
    await fs.mkdir(outdir, { recursive: true }).catch(e => {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    });
    const outfile = path.join(outdir, solution.uniquename + '.json');
    await fs.writeFile(outfile, JSON.stringify(solution, undefined, 2));
}

const main = async (solutionName: string) => {
    const results = isUuid(solutionName)
        ? { value: [ await lookup('solutions', solutionName) ] }
        : await query<any>('solutions', { uniquename: solutionName });
    switch (results.value.length) {
        case 0:
            throw `No solutions found with ID or name "${solutionName}"`;
        case 1:
            const result = results.value[0];
            const components = await query(`solutions(${result.solutionid})/solution_solutioncomponent`, undefined, [ 'objectid', 'componenttype' ]) as {
                '@odata.context': string;
                value: {
                    objectid: string;
                    componenttype: number;
                    solutioncomponentid: string;
                }[];
            };
            result.solutioncomponents = components.value;
            return result;
        default:
            throw `Multiple entities found with ID or name "${solutionName}"`;
    }
}

const cli = async (solutionNames: string[], options: Options) => {
    const config = await getConfig();
    
    if (solutionNames.length === 0) {
        if (config.project.solutions) {
            solutionNames.push(...config.project.solutions);
        }
    }

    const solutions = [];
    for (let i = 0; i < solutionNames.length; i++) {
        const solution = await main(solutionNames[i]);
        solutions.push(solution);
        
        if (options.outdir) {
            await saveSolution(options.outdir, solution);
        }
        else if (config.project.root) {
            const outdir = path.join(config.project.root, 'solutions');
            await saveSolution(outdir, solution);
        }
    }
    return solutions;
}

export default main;
export {
    cli,
    getProjectSolutions
}