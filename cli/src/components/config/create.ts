import path from 'path';
import { Command } from 'components/cli';
import services from 'services';
import { generateConfig } from 'services/config/generators';

const create: Command = async (_: string[]) => {
    const configFile = path.join(process.cwd(), 'xrm.jsonc');
    const fileHandler = services('FileHandler');
    if (await fileHandler.exists(configFile)) {
        console.error('Cannot create config file, one already exists.');
    }
    else {
        await generateConfig(configFile);
    }
}
export default create;