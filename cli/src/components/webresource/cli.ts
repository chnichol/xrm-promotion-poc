import yargs from 'yargs';
import { command as pullCommand } from './pull';
import { command as pushCommand } from './push';

export default (argv: string[]) => {
    const cli = yargs(argv.slice(1)).scriptName('web-resource');
    pullCommand(cli);
    pushCommand(cli);
    return cli.help().argv;
}