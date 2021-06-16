import { Argv } from 'yargs';
import api from '../../api';
import { isUuid, quote } from '../../common';
import { getConfig, saveConfig } from '../../common/config';

const clean = async () => {
    const config = await getConfig();

    const solutions = config.project?.solutions ?? [];
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

    config.project.solutions = Array.from(set);
    await saveConfig(config);
}

export const command = (yargs: Argv<{}>) => yargs.command('clean'
    , 'Clean the solution configuration, removing duplicates and missing solutions, and replacing names with ID\'s.'
    , builder => builder
        .usage('$0 clean')
    , _ => clean()
);

export default clean;