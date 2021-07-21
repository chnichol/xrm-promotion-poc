import { CommandModule } from '../cli';
import pull from './pull';
import typegen from './typegen';

const cli: CommandModule = {
    name: [ 'system-form', 'systemform', 'sf' ],
    commands: {
        pull,
        typegen
    }
}
export default cli;