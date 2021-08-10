import yargs, { Argv, showCompletionScript } from 'yargs';
import AttributeModule from './attribute/cli';
import ConfigModule from './config/cli';
import EntityModule from './entity/cli';
import PluginAssemblyModule from './pluginassembly/cli';
import SolutionModule from './solution/cli';
import SystemFormModule from './systemform/cli';
import WebResourceModule from './webresource/cli';
import { getPositionals } from '../common';

const commandModules = [
    AttributeModule,
    ConfigModule,
    EntityModule,
    PluginAssemblyModule,
    SolutionModule,
    SystemFormModule,
    WebResourceModule
];

export type CommandModule = {
    name: string | string[];
    commands: CommandSet;
}

export type CommandSet = {
    add?: Command;
    build?: Command;
    create?: Command;
    list?: Command;
    push?: Command;
    pull?: Command;
    remove?: Command;
    typegen?: Command;
}

export type Command = (names: string[]) => Promise<void>;

const command = (argv: Argv<unknown>, modules: CommandModule[], command: keyof CommandSet, description: string) => argv.command(command
    , description
    , builder => builder
        .usage(`$0 ${command} [component] [names...]`)
        .positional('component', {
            description: `Component to ${command}`,
            type: 'string',
            choices: modules.filter(m => m.commands[command]).map(m => Array.isArray(m.name) ? m.name[0] : m.name)
        })
        .positional('names', {
            description: 'Components to use.',
            type: 'string'
        })
        .array('names')
    , args => {
        const [component, ...names] = getPositionals(args);
        run(modules, command, component, names);
    }
);

const run = async (modules: CommandModule[], command: keyof CommandSet, component?: string, names?: string[]) => {
    if (component) {
        const m = modules.find(m => Array.isArray(m.name) ? m.name.includes(component) : m.name === component);
        if (!m) {
            console.error(`Component "${component}" does not exist`);
            return;
        }
        const cmd = m.commands[command];
        if (!cmd) {
            console.error(`Component "${Array.isArray(m.name) ? m.name[0] : m.name}" does not support the action "${command}"`);
            return;
        }
        await cmd(names ?? []);
    }
    else {
        if (command === 'create') {
            await run(modules, 'create', 'config', []);
        }
        else {
            const cmds = modules.filter(m => m.commands[command]).map(m => m.commands[command] as Command);
            for (const c in cmds) {
                await cmds[c](names ?? []);
            }
        }
    }
}

type CliResult = {
    [x: string]: unknown;
    _: (string | number)[];
    $0: string;
}

export default (argv: string[]): CliResult | Promise<CliResult> => {
    const commands: {
        [key in keyof Required<CommandSet>]: string
    } = {
        add: 'Add new components and their backing projects.',
        build: 'Build developer projects into deployable components.',
        create: 'Create new project artifacts.',
        list: 'List components.',
        pull: 'Download the latest component definitions from Dynamics.',
        push: 'Upload the current, local component definitions to Dynamics.',
        remove: 'Remove components and their backing projects.',
        typegen: 'Generate code based on component definitions.'
    }
    const cli = yargs(argv).scriptName('xrm-cli');
    for (const c in commands) {
        const k = c as keyof CommandSet;
        command(cli, commandModules, k, commands[k]);
    }
    return cli.help().argv;
}
