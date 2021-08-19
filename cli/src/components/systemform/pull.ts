import { Command } from 'components/cli';
import { getProjectSolutionComponents } from 'components/solutioncomponent';
import { isUuid, quote, } from 'helpers';
import services from 'services';
import { ComponentType } from 'types/entity/SolutionComponent';
import SystemForm, { FormType } from 'types/entity/SystemForm';

const save = async (form: SystemForm) => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const jsonParser = services('JSONParser');
    const xmlParser = services('XMLParser');
    const paths = config.content.entities(form.objecttypecode).systemForms(form.name, FormType[form.type]);
    await fileHandler.makeDir(paths.directory);
    await fileHandler.saveFile(paths.definition, { ...form, formjson: undefined, formxml: undefined }, 'json');
    switch (config.settings.systemFormFormat) {
        case 'json': {
            const json = jsonParser.parse(form.formjson);
            await fileHandler.saveFile(paths.form, json, 'json');
            //Deleting the other format's file if it exists
            try {
                const xmlFormPath = paths.form.replace('.json', '.xml');
                if (await fileHandler.exists(xmlFormPath)) {
                    await fileHandler.removeFile(xmlFormPath);
                }
            }
            catch (e) {
                console.error(e);
            }
            break;
        }
        case 'xml': {
            const xml = await xmlParser.parse(form.formxml);
            await fileHandler.saveFile(paths.form, xml, 'xml');
            //Deleting the other format's file if it exists
            try {
                const jsonFormPath = paths.form.replace('.xml', '.json');
                if (await fileHandler.exists(jsonFormPath)) {
                    await fileHandler.removeFile(jsonFormPath);
                }
            }
            catch (e) {
                console.error(e);
            }
            break;
        }
    }
}

const pull: Command = async (names: string[]) => {
    const api = services('DynamicsAPI');
    const [_, components] = await getProjectSolutionComponents(ComponentType.Entity);
    names = (names.length === 0 ? Array.from(components.map(c => c.objectid)) : names);

    for (let i = 0; i < names.length; i++) {
        const entityQuery = await api.entity.query({
            filter: (isUuid(names[i]) ? { entityid: quote(names[i]) } : { logicalname: quote(names[i]) }),
            select: ['entityid', 'logicalname']
        }).execute();
        const entity = entityQuery.length === 1 ? entityQuery[0] : undefined;
        if (!entity) {
            const property = isUuid(names[i]) ? 'entityid' : 'logicalname';
            console.warn(`No entities found where ${property}="${names[i]}"`)
            continue;
        }
        if (!components.find(c => c.objectid === entity.entityid)) {
            console.warn(`No solution includes the entity ${entity.logicalname} (${entity.entityid})`);
        }

        const results = await api.systemform.query({ filter: { objecttypecode: quote(entity.logicalname) } }).execute();
        for (let j = 0; j < results.length; j++) {
            await save(results[j]);
        }
    }
}
export default pull;