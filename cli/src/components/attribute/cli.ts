import { CommandModule } from 'components/cli';
import push from './push';
import typegen from './typegen';

const cli: CommandModule = {
    name: 'attribute',
    commands: {
        push,
        typegen
    }
}
export default cli;