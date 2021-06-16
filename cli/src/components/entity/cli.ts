import yargs from 'yargs';
import { command as pullCommand } from './pull';
import { command as pushCommand } from './push';
import { command as typegenCommand } from './typegen';

export default (argv: string[]) => {
    const cli = yargs(argv.slice(1)).scriptName('entity');
    pullCommand(cli);
    pushCommand(cli);
    typegenCommand(cli);
    return cli.help().argv;
}