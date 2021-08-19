import { Command } from 'components/cli';
import { isUuid, quote } from 'helpers';
import services from 'services';

const clean: Command = async () => {
    const api = services('DynamicsAPI');
    const config = services('Config');
    const solutions = config.settings.solutions;
    const set: Set<string> = new Set();
    for (let i = 0; i < solutions.length; i++) {
        const name = solutions[i];
        const results = isUuid(name)
            ? await api.solution.query({ filter: { solutionid: quote(name) }, select: ['solutionid'] }).execute()
            : await api.solution.query({ filter: { uniquename: quote(name) }, select: ['solutionid'] }).execute()

        if (results.length === 1 && !set.has(results[0].solutionid)) {
            set.add(results[0].solutionid);
        }
    }

    config.settings.solutions = Array.from(set);
    console.error('Cleaning solutions is not currently supported');
}
export default clean;