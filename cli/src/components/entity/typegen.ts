import os from 'os';
import { Project } from 'ts-morph';
import { parseFile } from '../../common';
import config from '../../config';
import AttributeTypeCode from '../../types/enum/AttributeTypeCode';
import AttributeMetadata from '../../types/metadata/AttributeMetadata';
import { getEntityAttributes } from '../attribute';
import { Command } from '../cli';
import { getProjectEntities } from '.';

const getAttributeType = (attributeType: AttributeTypeCode) => {
    switch (attributeType) {
        case 'BigInt':
        case 'Decimal':
        case 'Double':
        case 'Integer':
            return 'number';
        case 'Boolean':
            return 'boolean';
        case 'DateTime':
            return 'Date';
        case 'EntityName':
        case 'String':
        case 'Uniqueidentifier':
            return 'string';
        default:
            return 'any';
    }
}

const typegen = async (name: string, project: Project) => {
    const entityPaths = config().content.entities(name);
    const typeFile = entityPaths.typedef;
    const attributes = await getEntityAttributes(name);
    const attributeMetadata = await Promise.all(attributes.map(async attribute => {
        const definitionFile = entityPaths.attributes(attribute).definition;
        const definition = await parseFile<AttributeMetadata>(definitionFile);
        return definition;
    }));

    const typedef = project.createSourceFile(typeFile, undefined, { overwrite: true });
    typedef.addInterface({
        name: attributeMetadata[0].EntityLogicalName,
        isDefaultExport: true,
        properties: attributeMetadata.map(attribute => {
            const docs = [];
            if (attribute.Description?.UserLocalizedLabel?.Label) {
                docs.push(attribute.Description.UserLocalizedLabel.Label);
            }
            if (attribute.DisplayName?.UserLocalizedLabel?.Label) {
                docs.push(`@display ${attribute.DisplayName.UserLocalizedLabel.Label}`);
            }
            if (!attribute.IsValidForUpdate) {
                docs.push('@readonly');
            }
            return {
                name: attribute.LogicalName,
                docs: [docs.join(os.EOL)],
                isReadonly: !attribute.IsValidForUpdate,
                type: getAttributeType(attribute.AttributeType)
            }
        })
    });
}

const typegenCommand: Command = async (names: string[]) => {
    names = (names.length === 0 ? await getProjectEntities() : names);
    const project = new Project();
    for (let i = 0; i < names.length; i++) {
        await typegen(names[i], project);
    }
    await project.save();
}

export default typegenCommand;