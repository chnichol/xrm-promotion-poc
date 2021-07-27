import fs from 'fs/promises';
import JSONBigInt from 'json-bigint';
import xml2js from 'xml2js';
import api from '../../api';
import { isUuid, mkdir, quote, saveFile, saveFileXML } from '../../common';
import Config, { getConfig, getPath } from '../../common/config';
import { getProjectSolutionComponents } from '../solutioncomponent';
import { ComponentType } from '../../types/entity/SolutionComponent';
import SystemForm, { FormType } from '../../types/entity/SystemForm';
import { Command } from '../cli';

const save = async (config: Config, form: SystemForm) => {
    const paths = getPath(config).systemform(form.objecttypecode, form.name, FormType[form.type]);
    await mkdir(paths.directory);
    await saveFile(paths.definition, { ...form, formjson: undefined, formxml: undefined });
    switch (config.project.forms) {
        case 'json': {
            const json = JSONBigInt.parse(form.formjson);
            await saveFile(paths.form + '.json', json);
            try {
                await fs.rm(paths.form + '.xml');
            }
            catch (e) {
                console.error(e);
            }
            break;
        }
        case 'xml': {
            const xml = await xml2js.parseStringPromise(form.formxml);
            await saveFileXML(paths.form + '.xml', xml);
            try {
                await fs.rm(paths.form + '.json');
            }
            catch (e) {
                console.error(e);
            }
            break;
        }
    }
}

const pull: Command = async (names: string[]) => {
    const config = await getConfig();
    const [ components ] = await getProjectSolutionComponents(ComponentType.Entity);
    names = (names.length === 0 ? Array.from(components) : names);
    
    for (let i = 0; i < names.length; i++) {
        const entityQuery = await api.entity.query({
            filter: (isUuid(names[i]) ? { entityid: quote(names[i]) } : { logicalname: quote(names[i]) }),
            select: [ 'entityid', 'logicalname' ]
        }).execute();
        const entity = entityQuery.length === 1 ? entityQuery[0] : undefined;
        if (!entity) {
            const property = isUuid(names[i]) ? 'entityid' : 'logicalname';
            console.warn(`No entities found where ${property}="${names[i]}"`)
            continue;
        }
        if (!components.has(entity.entityid)) {
            console.warn(`No solution includes the entity ${entity.logicalname} (${entity.entityid})`);
        }

        const results = await api.systemform.query({ filter: { objecttypecode: quote(entity.logicalname) } }).execute();        
        for (let j = 0; j < results.length; j++) {
            await save(config, results[j]);
        }
    }
}
export default pull;