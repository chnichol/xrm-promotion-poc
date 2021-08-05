import api from '../../api';
import { isUuid, quote } from '../../common';
import config from '../../common/config';
import { Command } from '../cli';

const clean: Command = async () => {
    const solutions = config.settings.project.solutions;
    const set: Set<string> = new Set();
    for (let i = 0; i < solutions.length; i++) {
        const name = solutions[i];
        const results = isUuid(name)
            ? await api.solution.query({ filter: { solutionid: quote(name) }, select: [ 'solutionid' ] }).execute()
            : await api.solution.query({ filter: { uniquename: quote(name) }, select: [ 'solutionid' ] }).execute()

        if (results.length === 1 && !set.has(results[0].solutionid)) {
            set.add(results[0].solutionid);
        }
    }

    config.settings.project.solutions = Array.from(set);
    console.error('Cleaning solutions is not currently supported');
}
export default clean;