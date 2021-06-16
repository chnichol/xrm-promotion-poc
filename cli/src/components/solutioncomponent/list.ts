import { Argv } from 'yargs';
import api from '../../api';
import { getPositionals, isUuid } from '../../common';
import { getProjectSolutions } from '../solution';
import { ComponentType } from '../../types/entity/SolutionComponent';

interface Options {
    source?: string;
}

const list = async (names: string[], source: 'local' | 'remote') => {
    if (source === 'local') {
        const solutions = (await getProjectSolutions(names)).map(s => ({
            solutionid: s.solutionid,
            uniquename: s.uniquename,
            solution_solutioncomponent: s.solution_solutioncomponent
        }));
        return solutions;
    }
    else if (source === 'remote') {
        const solutions = (await Promise.all(names.map(name => (
            api.solution.query({
                filter: isUuid(name) ? { solutionid: name } : { uniquename: name },
                select: [ 'solutionid', 'uniquename' ]
            })
            .expandCollection('solution_solutioncomponent')
            .execute()
        )))).filter(result => result.length === 1).map(result => result[0]);
        return solutions;
    }
    return [];
};

const listCommand = async (names: string[], options: Options) => {
    if (names.length === 0) {
        names = (await getProjectSolutions()).map(s => s.solutionid);
    }
    const solutions = await list(names, (options.source ?? 'local') as any);
    const results: {
        'Solution': string,
        'Component ID': string,
        'Component Type': string,
        'Object ID': string
    }[] = [];
    names.map(name => {
        const solution = solutions.find(s => s.solutionid === name || s.uniquename === name);
        if (solution && solution.solution_solutioncomponent) {
            solution.solution_solutioncomponent.forEach(component =>
                results.push({
                    'Solution': solution.uniquename,
                    'Component ID': component.solutioncomponentid,
                    'Component Type': ComponentType[component.componenttype],
                    'Object ID': component.objectid
                })
            )
        }
        else {
            results.push({
                'Solution': name,
                'Component ID': 'None',
                'Component Type': 'None',
                'Object ID': 'None'
            })
        }
    });
    console.table(results);
}

export const command = (yargs: Argv<{}>) => yargs.command('list', 'List things'
    , builder => builder
        .usage('$0 list <solutions> [options]')
        .positional('solutions', {
            description: 'Solutions to list components from, leaving blank uses the project solutions.',
            type: 'string',
        })
        .option('source', {
            default: 'local',
            description: 'List remote solutions instead of local ones.',
            choices: [ 'local', 'remote' ],
            type: 'string'
        })
        .array('solutions')
    , args => listCommand(getPositionals(args), args)
);

export default list;