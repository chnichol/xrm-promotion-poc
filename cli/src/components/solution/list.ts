import { Argv } from 'yargs';
import api from '../../api';
import { isUuid } from '../../common';
import { getConfig } from '../../common/config';
import { getProjectSolutions } from '.';

interface Options {
    source?: string;
}

const list = async (source: 'config' | 'local' | 'remote') => {
    let solutions: { solutionid: string, uniquename: string }[] = [];
    switch(source) {
        case 'config':
            solutions = ((await getConfig()).project.solutions ?? []).map(s => isUuid(s) ? { solutionid: s, uniquename: '' } : { solutionid: '', uniquename: s });
            break;
        case 'local':
            solutions = await getProjectSolutions();
            break;
        case 'remote':
            solutions = await api.solution.query({ select: [ 'solutionid', 'uniquename' ] }).execute();
            break;
    }
    return solutions;
};

const listCommand = async (options: Options) => {
    const solutions = await list(options.source as any);
    const rows = solutions
        .sort((s1, s2) => s1.uniquename.localeCompare(s2.uniquename))
        .map(s => ({ 'Unique Name': s.uniquename, 'Solution ID': s.solutionid }));
    console.table(rows);
}

export const command = (yargs: Argv<{}>) => yargs.command('list', 'List things'
    , builder => builder
        .usage('$0 list [options]')
        .option('source', {
            default: 'local',
            description: 'List remote solutions instead of local ones.',
            choices: [ 'config', 'local', 'remote' ],
            type: 'string'
        })
    , args => listCommand(args)
);

export default list;