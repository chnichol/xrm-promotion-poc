import yargs from 'yargs';
import { command as listCommand } from './list';

export default (argv: string[]) => {
    const cli = yargs(argv.slice(1)).scriptName('solution-component');
    listCommand(cli);
    return cli.help().argv;
}