import yargs, { Argv } from 'yargs';
import pullEntities from './entity/pull';
import pullSolutions from './solution/pull';
import pullWebResources from './webresource/pull';
import pushEntities from './entity/push';
import pushWebResources from './webresource/push';
import typegenEntities from './entity/typegen';

const pullCommand = (yargs: Argv<{}>) => yargs.command('pull'
    , 'Pulls the latest components from dynamics.'
    , builder => builder
        .usage('$0 pull')
    , async _ => {
        await pullSolutions([], {});
        await pullEntities([]);
        await pullWebResources([]);
    }
);

const pushCommand = (yargs: Argv<{}>) => yargs.command('push'
    , 'Pushes local component changes to dynamics.'
    , builder => builder
        .usage('$0 push')
    , async _ => {
        await pushEntities([]);
        await pushWebResources([]);
    }
);

const typegenCommand = (yargs: Argv<{}>) => yargs.command('typegen'
    , 'Generates types for the project.'
    , builder => builder
        .usage('$0 push')
    , async _ => {
        await typegenEntities([]);
    }
);

export default (argv: string[]) => {
    const cli = yargs(argv);
    pullCommand(cli);
    pushCommand(cli);
    typegenCommand(cli);
    return cli.help().argv;
}