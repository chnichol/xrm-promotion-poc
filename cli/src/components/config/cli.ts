import { CommandModule } from 'components/cli';
import create from './create';

const cli: CommandModule = {
    name: 'config',
    commands: {
        create
    }
}
export default cli;