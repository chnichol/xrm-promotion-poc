import { Project } from 'ts-morph';
import { getEntityAttributes } from '.';
import { parseFile } from '../../common';
import { getConfig, getPath } from '../../common/config';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import { Command } from '../cli';
import { getProjectEntities } from '../entity';

const typegen: Command = async (names: string[]) => {
    const project = new Project();
    
    const config = await getConfig();
    const entities = await getProjectEntities();
    names = names.length === 0 ? entities : names;
    for (const n in names) {
        const name = names[n];
        const attributes = await getEntityAttributes(name);
        for (const a in attributes) {
            const attribute = attributes[a];
            const definitionFile = getPath(config).attribute(name, attribute).definition;
            const definition = await parseFile<AttributeMetadata>(definitionFile);
            const typedefFile = getPath(config).attribute(name, attribute).typedef;
            
            const typedef = project.createSourceFile(typedefFile, undefined, { overwrite: true });
            typedef.addImportDeclaration({ moduleSpecifier: 'xrm-types', namedImports: [ 'Attribute' ] });
            typedef.addImportDeclaration({ moduleSpecifier: '../../index', defaultImport: 'Entity' });
            typedef.addInterface({
                name: definition.LogicalName,
                docs: definition.Description?.UserLocalizedLabel?.Label ? [ definition.Description.UserLocalizedLabel.Label ] : undefined,
                extends: [`Attribute<Entity["${definition.LogicalName}"]>`],
                isDefaultExport: true
            });
        }
    }

    await project.save();
}
export default typegen;