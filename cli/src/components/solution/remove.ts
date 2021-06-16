import { Argv } from 'yargs';
import { getPositionals } from '../../common';
import { getConfig, saveConfig } from '../../common/config';

interface Options {
    all?: boolean;
}

const remove = async (names: string[], options: Options) => {
    const config = await getConfig();
    const solutions = config.project.solutions ?? [];
    const set = new Set<string>(solutions);

    if (options.all) {
        config.project.solutions = [];
    }
    else {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            if (set.has(name)) {
                set.delete(name);
            }
            else {
                console.warn(`Project doesn't contain a solution for ${name}`);
            }
        }
        config.project.solutions = Array.from(set);
    }


    await saveConfig(config);
}

export const command = (yargs: Argv<{}>) => yargs.command('remove'
    , 'Removes solutions from the project configuration.'
    , builder => builder
        .usage('$0 remove <solutions>')
        .positional('solutions', {
            description: 'Solutions to remove from the project configuration.',
            type: 'string'
        })
        .array('solutions')
        .option('all', {
            description: 'Remove all solutions from the project configuration.',
            type: 'boolean'
        })
    , args => remove(getPositionals(args), args)
);

export default remove;