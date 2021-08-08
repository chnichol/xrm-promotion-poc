import config from '../../config';
import { Command } from '../cli';

const remove: Command = async (names: string[]) => {
    const solutions = config().settings.solutions ?? [];
    const set = new Set<string>(solutions);

    if (names.length === 0) {
        config().settings.solutions = [];
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
        config().settings.solutions = Array.from(set);
    }
    console.error('Removing solutions is not currently supported');
}
export default remove;