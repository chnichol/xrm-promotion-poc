import yargs from 'yargs';

export default (argv: string[]) => yargs(argv.slice(1))
    .scriptName('solution')
    .command('get', 'Get solutions'
        , builder => builder
            .usage('$0 get <solutions> [options]')
            .positional('solutions', {
                description: 'Solutions to get. Accepts both the Solution ID and Unique Name.',
                type: 'string'
            })
            .option('outdir', {
                description: 'Directory to save solution files. If none is provided, files will be saved in the default project location.',
                type: 'string'
            })
            .array('solutions')
        , args => console.log(args)
    )
    .command('list', 'Lists available solutions'
        , builder => builder
            .usage('$0 list [options]')
            .option('remote', {
                description: 'List remote solutions instead of local ones.',
                type: 'boolean'
            })
        , args => console.log(args)
    )
    .help()
    .argv;