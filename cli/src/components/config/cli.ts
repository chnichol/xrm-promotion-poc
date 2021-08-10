import { CommandModule } from '../cli';
import create from './create';

const cli: CommandModule = {
    name: 'config',
    commands: {
        create
    }
}
export default cli;