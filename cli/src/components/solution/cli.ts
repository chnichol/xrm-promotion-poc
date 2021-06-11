import yargs from 'yargs';
import { command as addCommand } from './add';
import { command as cleanCommand } from './clean';
import { command as listCommand } from './list';
import { command as pullCommand } from './pull';
import { command as removeCommand } from './remove';

export default (argv: string[]) => {
    const cli = yargs(argv.slice(1)).scriptName('solution');
    addCommand(cli);
    cleanCommand(cli);
    listCommand(cli);
    pullCommand(cli);
    removeCommand(cli);
    return cli.help().argv;
}