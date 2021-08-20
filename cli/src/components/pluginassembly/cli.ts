import { CommandModule } from 'components/cli';
import build from './build';
import pull from './pull';
import push from './push';

const cli: CommandModule = {
    name: [ 'plugin-assembly', 'pluginassembly', 'pa' ],
    commands: {
        build,
        pull,
        push
    }
}
export default cli;