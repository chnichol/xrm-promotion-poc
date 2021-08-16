import path from 'path';
import { exists } from '../../common';
import { generateConfig } from '../../services/config/generators';
import { Command } from '../cli';

const create: Command = async (_: string[]) => {
    const configFile = path.join(process.cwd(), 'xrm.jsonc');
    if (await exists(configFile)) {
        console.error('Cannot create config file, one already exists.');
    }
    else {
        await generateConfig(configFile);
    }
}
export default create;