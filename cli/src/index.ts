import yargs from 'yargs';
import { cli as generateType } from './generateType';
import { cli as getEntity } from './getEntity';
import { cli as getRecord } from './getRecord';
import { cli as updateRecord } from './updateRecord';

yargs(process.argv.slice(2))
    .command('gen-type', 'Generates a type definition file for an entity.'
        , builder => builder
            .usage('gen-type [options]')
            .option('entity', {
                description: 'File with entity definition',
                type: 'string'
            })
            .option('file', {
                description: 'File to save type definition',
                type: 'string'
            })
            .demandOption('entity')
        , args => generateType(args)
    )
    .command('get-entity', 'Gets the entity definition for a provided resource.'
        , builder => builder
            .usage('get-entity <entity> [options]')
            .required(1, 'Missing required argument: entity')
            .option('file', {
                description: 'File to save the entity definition',
                type: 'string'
            })
        , args => {
            getEntity(args._[1].toString(), args).then(out => console.log(JSON.stringify(out, undefined, 2)))
        }
    )    
    .command('get-record', 'Gets the content of a specific record.'
        , builder => builder
            .usage('get-record <entity> [options]')
            .required(1, 'Missing required argument: entity')
            .option('id', {
                description: 'Record ID',
                type: 'string'
            })
            .option('folder', {
                description: 'Folder to store results in',
                type: 'string'
            })
            .option('name', {
                description: 'Record name',
                type: 'string'
            })
        , args => getRecord(args._[1] as string, args).then(out => console.log(JSON.stringify(out, undefined, 2)))
    )
    .command('update-record', 'Updates a record'
        , builder => builder
            .usage('update-record <entity> [options]')
            .required(1, 'Missing required argument: entity')
            .option('file', {
                description: 'File that contains the record details',
                type: 'string'
            })
            .demandOption('file')
        , args => updateRecord(args._[1] as string, args)
    )
    .help().argv;