import api from '../../api';
import { isUuid, quote } from '../../common';
import config from '../../config';
import { Command } from '../cli';

const add: Command = async (names?: string[]) => {
    names = names ?? [];
    const solutions = config().settings.solutions ?? [];
    const set = new Set<string>(solutions);

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const property = isUuid(name) ? 'solutionid' : 'uniquename';
        const results = isUuid(name)
            ? await api.solution.query({ filter: { solutionid: quote(name) }, select: ['solutionid', 'uniquename'] }).execute()
            : await api.solution.query({ filter: { uniquename: quote(name) }, select: ['solutionid', 'uniquename'] }).execute()

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

    config().settings.solutions = solutions;
    console.error('Adding solutions is not currently supported');
}
export default add;