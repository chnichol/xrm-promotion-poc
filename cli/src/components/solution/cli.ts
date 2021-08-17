import { CommandModule } from 'components/cli';
import add from './add';
import list from './list';
import pull from './pull';
import remove from './remove';

const cli: CommandModule = {
    name: 'solution',
    commands: {
        add,
        list,
        pull,
        remove
    }
}
export default cli;