import path from 'path';
import api from '../../api';
import { isUuid, mkdir, quote, saveFile } from '../../common';
import config from '../../config';
import Solution from '../../types/entity/Solution';
import { Command } from '../cli';

const save = async (outdir: string, solution: Solution) => {
    const outfile = path.join(outdir, solution.uniquename + '.json');
    await mkdir(outdir);
    await saveFile(outfile, solution);
}

const pull: Command = async (names: string[]) => {
    names = (names.length === 0 ? config().settings.solutions : names);
    const outdir = config().content.solutions.directory;

    const solutions = new Set<string>();
    for (let i = 0; i < names?.length; i++) {
        const name = names[i];
        const property = isUuid(name) ? 'solutionid' : 'uniquename';

        const results = await api.solution
            .query({
                filter: (isUuid(name) ? { solutionid: quote(name) } : { uniquename: quote(name) })
            })
            .expandCollection('solution_solutioncomponent')
            .execute();

        switch (results.length) {
            case 0:
                console.warn(`No solutions found where ${property}="${name}"`);
                break;
            case 1:
                if (!solutions.has(results[0].solutionid)) {
                    solutions.add(results[0].solutionid);
                    await save(outdir, results[0]);
                }
                break;
            default:
                console.warn(`Multiple solutions found where ${property}="${name}"`);
                break;
        }
    }
}
export default pull;