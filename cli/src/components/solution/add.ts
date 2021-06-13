import { Argv } from 'yargs';
import api from '../../api';
import { getPositionals, isUuid, quote } from '../../common';
import { getConfig, saveConfig } from '../../common/config';

const add = async (names?: string[]) => {
    const config = await getConfig();
    names = names ?? [];
    const solutions = config.project.solutions ?? [];
    const set = new Set<string>(solutions);

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const property = isUuid(name) ? 'solutionid' : 'uniquename';
        const results = isUuid(name)
            ? await api.solution.query({ filter: { solutionid: quote(name) }, select: [ 'solutionid', 'uniquename' ] }).execute()
            : await api.solution.query({ filter: { uniquename: quote(name) }, select: [ 'solutionid', 'uniquename' ] }).execute()
        
        switch (results.length) {
            case 0:
                console.warn(`No solutions found where ${property}="${name}"`);
                break;
            case 1:
                if (set.has(results[0].solutionid) || set.has(results[0].uniquename)) {
                    console.warn(`Project already contains a solution for ${results[0].uniquename} (${results[0].solutionid})`);
                }
                else {
                    solutions.push(results[0].solutionid);
                }
                break;
            default:
                console.warn(`Multiple solutions found where ${property}="${name}"`);
                break;
        }
    }

    config.project.solutions = solutions;
    await saveConfig(config);
}

export const command = (yargs: Argv<{}>) => yargs.command('add'
    , 'Adds solutions to the project configuration.'
    , builder => builder
        .usage('$0 add <solutions>')
        .positional('solutions', {
            description: 'Solutions to add to the project configuration.',
            type: 'string'
        })
        .require(1, 'Missing required positional, "solutions"')
        .array('solutions')
    , args => add(getPositionals(args))
);

export default add;