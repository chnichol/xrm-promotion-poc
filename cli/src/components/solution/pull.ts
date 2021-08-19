import path from 'path';
import { Command } from 'components/cli';
import { isUuid, quote } from 'helpers';
import services from 'services';
import Solution from 'types/entity/Solution';

const save = async (outdir: string, solution: Solution) => {
    const fileHandler = services('FileHandler');
    const outfile = path.join(outdir, solution.uniquename + '.json');
    await fileHandler.makeDir(outdir);
    await fileHandler.saveFile(outfile, solution, 'json');
}

const pull: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const config = services('Config');
    const outdir = config.content.solutions.directory;
    names = (names.length === 0 ? config.settings.solutions : names);

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