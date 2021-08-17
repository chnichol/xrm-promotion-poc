import { CommandModule } from 'components/cli';
import pull from './pull';
import push from './push';
import typegen from './typegen';

const cli: CommandModule = {
    name: 'entity',
    commands: {
        pull,
        push,
        typegen
    }
}
export default cli;