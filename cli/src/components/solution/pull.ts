import path from 'path';
import { Argv } from 'yargs';
import api from '../../api';
import { isUuid, mkdir, quote, saveFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import { ComponentType } from '../solutioncomponent/types';

interface Options {
    outdir?: string;
}

const save = async (outdir: string, solution: any) => {
    const outfile = path.join(outdir, solution.uniquename + '.json');
    await mkdir(outdir);
    await saveFile(outfile, solution);
}

const pull = async (names: string[], options: Options) => {
    const config = await getConfig();

    names = (names.length === 0 ? config.project.solutions : names);
    const outdir = options.outdir ?? getPath(config).solutions;
    
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

export const command = (yargs: Argv<{}>) => yargs.command('pull'
    , 'Pulls the latest solution definition from dynamics.'
    , builder => builder
        .usage('$0 pull <solutions>')
        .positional('solutions', {
            description: 'Solutions to pull the latest of.',
            type: 'string'
        })
        .array('solutions')
        .option('outdir', {
            description: 'Directory to save solution definitions to.',
            type: 'string'
        })
    , args => pull(args._.slice(1).map(a => a.toString()), args)
);

export default pull;