import yargs from 'yargs';
import { cli as generateTypes } from './generateTypeDef';
import { cli as getEntity } from './getEntity';
import { cli as getWebResources } from './getWebResource';
import { cli as listSolutions } from './listSolutions';
import { cli as publishEntities } from './publishEntity';
import { cli as publishWebResources } from './publishWebResource';

(yargs(process.argv.slice(2)) as any)
    .command('gen-types', 'Generates a type definition file for an entity.'
        , (builder: any) => builder
            .usage('gen-types <entities>')
            .option('entities', {
                description: 'Entities to generate types for',
                type: 'string'
            })
            .array('entities')
        , (args: any)=> generateTypes(args._.slice(1).map((a: any) => a.toString()))
    )
    .command('get-entities', 'Gets the entity definition for a provided resource.'
        , (builder: any)=> builder
            .usage('get-entities <entities> [options]')
            .positional('entities', {
                description: 'Entities to download'
            })
            .option('outdir', {
                description: 'Folder to save entity definitions',
                type: 'string'
            })
            .option('solution', {
                description: 'Solution to get entity from',
                type: 'string'
            })
            .array('entities')
            .array('solution')
        , (args: any)=> getEntity(args._.slice(1).map((a: any) => a.toString()), args)
    )
    .command('get-webresources', 'Gets the web resources.'
        , (builder: any)=> builder
            .usage('get-webresources <webresources> [options]')
            .positional('webresources', {
                description: 'Web resources to download'
            })
            .option('outdir', {
                description: 'Folder to save web resources',
                type: 'string'
            })
            .option('solution', {
                description: 'Solution to get web resource from',
                type: 'string'
            })
            .array('entities')
            .array('solution')
        , (args: any)=> getWebResources(args._.slice(1).map((a: any) => a.toString()), args)
    )    
    .command('list-solutions', 'Lists solutions in the dynamics environment'
        , (builder: any)=> builder
            .usage('list-solutions')
            .option('remote', {
                description: 'List remote solutions instead of local solutions',
                type: 'boolean'
            })
        , (args: any)=> listSolutions(args)
    )
    .command('publish-entities', 'Publishes entity changes'
        , (builder: any)=> builder
            .usage('publish-entities <entities> [options]')
            .positional('entities', {
                description: 'Entities to publish'
            })
            .option('solution', {
                description: 'Solution to publish from',
                type: 'string'
            })
            .array('entities')
            .array('solution')
        , (args: any)=> publishEntities(args._.slice(1).map((a: any) => a.toString()), args)
    )
    .command('publish-webresources', 'Publishes web resource changes'
        , (builder: any)=> builder
            .usage('publish-webresources <web-resources> [options]')
            .positional('web-resources', {
                description: 'Web resources to publish'
            })
            .option('solution', {
                description: 'Solution to publish from',
                type: 'string'
            })
            .array('web-resources')
            .array('solution')
        , (args: any)=> publishWebResources(args._.slice(1).map((a: any) => a.toString()), args)
    )
    .help().argv;