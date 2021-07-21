import { Argv } from 'yargs';
import { getPositionals } from '../../common';
import { getConfig, saveConfig } from '../../common/config';
import { Command } from '../cli';

const remove: Command = async (names: string[]) => {
    const config = await getConfig();
    const solutions = config.project.solutions ?? [];
    const set = new Set<string>(solutions);

    if (names.length === 0) {
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
export default remove;