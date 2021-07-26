import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getEntityForms } from '.';
import { mkdir, parseFileXML } from '../../common';
import { getConfig, getPath } from '../../common/config';
import { Command } from '../cli';
import { getProjectEntities } from '../entity';
import { Attribute, Control, Form, FormXML, ProjectForm, Section, Tab } from './types';

const loadFormXml = async (file: string) => {
    return await parseFileXML<FormXML>(file);
}

const saveImports = async (stream: fs.FileHandle, attributes: Attribute[]) => {
    await stream.write(`import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-types';${os.EOL}`);
    for (let a in attributes) {
        const attribute = attributes[a];
        await stream.write(`import ${attribute.name} from '../../../attributes/${attribute.name}';${os.EOL}`);
    }
    await stream.write(os.EOL);
}

const saveAttributeControlCollection = async (stream: fs.FileHandle, attribute: Attribute) => {
    const names = attribute.controls.map(c => `Control_${c}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`; 
    await stream.write(`interface Attribute_${attribute.name}_ControlCollection extends Collection<${union}> {${os.EOL}`);
    await stream.write(`    get(): ${list};${os.EOL}`);
    for (let c in attribute.controls) {
        const control = attribute.controls[c];
        await stream.write(`    get(index: number): (${union});${os.EOL}`);
        await stream.write(`    get(name: '${control}'): Control_${control};${os.EOL}`);
    }
    await stream.write(`    get(predicate: (value: ${union}, index: number) => boolean): (${union})[];${os.EOL}`);
    await stream.write(`    getLength(): ${attribute.controls.length};${os.EOL}`)
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveAttributes = async (stream: fs.FileHandle, attributes: Attribute[]) => {
    for (let a in attributes) {
        const attribute = attributes[a];
        await saveAttributeControlCollection(stream, attribute);
    
        await stream.write(`interface Attribute_${attribute.name} extends ${attribute.name} {${os.EOL}`);
        await stream.write(`    controls: Attribute_${attribute.name}_ControlCollection;${os.EOL}`);
        await stream.write(`}${os.EOL}${os.EOL}`);
    }
}

const saveControls = async (stream: fs.FileHandle, controls: Control[]) => {
    for (let c in controls) {
        const control = controls[c];
        const attribute = control.field ? `Attribute_${control.field}` : 'undefined';
        await stream.write(`interface Control_${control.id} {${os.EOL}`);
        await stream.write(`    getAttribute(): ${attribute};${os.EOL}`);
        await stream.write(`}${os.EOL}${os.EOL}`);
    }
}

const saveDataEntityAttributeCollection = async (stream: fs.FileHandle, attributes: Attribute[]) => {
    const names = attributes.map(a => `Attribute_${a.name}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`; 
    await stream.write(`interface Entity_AttributeCollection extends Collection<${union}> {${os.EOL}`);
    await stream.write(`    get(): ${list};${os.EOL}`);
    await stream.write(`    get(index: number): (${union});${os.EOL}`);
    for (let a in attributes) {
        const attribute = attributes[a];
        if (attribute.name) {
            await stream.write(`    get(name: '${attribute.name}'): Attribute_${attribute.name};${os.EOL}`);
        }
    }
    await stream.write(`    get(predicate: (value: ${union}, index: number) => boolean): (${union})[];${os.EOL}`);
    await stream.write(`    getLength(): ${attributes.length};${os.EOL}`)
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveDataEntity = async (stream: fs.FileHandle, entity: string, attributes: Attribute[]) => {
    await saveDataEntityAttributeCollection(stream, attributes);
    await stream.write(`interface DataEntity extends Entity<'${entity}'> {${os.EOL}`);
    await stream.write(`    attributes: Entity_AttributeCollection;${os.EOL}`);
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveData = async (stream: fs.FileHandle, form: Form) => {
    await saveDataEntity(stream, form.entity, form.attributes);
    await stream.write(`interface Data extends FormContextData {${os.EOL}`);
    await stream.write(`    entity: DataEntity;${os.EOL}`);
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveUiTabSectionControlCollection = async (stream: fs.FileHandle, tabIndex: number, section: Section) => {
    const names = section.controls.map(c => `Control_${c.id}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const tuple = names.length === 0 ? '[]' : `[${names.join(', ')}]`; 
    await stream.write(`interface UI_Tab${tabIndex}_Section${section.index}_ControlCollection extends Collection<${union}> {${os.EOL}`);
    await stream.write(`    get(): ${tuple};${os.EOL}`);
    if (section.controls.length === 0) {
        await stream.write(`    get(index: number): never;${os.EOL}`);
        await stream.write(`    get(name: string): never;${os.EOL}`);
    }
    else {
        for (let c in section.controls) {
            const control = section.controls[c];
            await stream.write(`    get(index: number): never;${os.EOL}`);
            await stream.write(`    get(name: '${control.id}'): Control_${control.id};${os.EOL}`);
        }
    }
    await stream.write(`    get(predicate: (value: ${union}, index: number) => boolean): (${union})[];${os.EOL}`);
    await stream.write(`    getLength(): ${section.controls.length};${os.EOL}`)
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveUiTabSections = async (stream: fs.FileHandle, tab: Tab) => {
    for (let s in tab.sections) {
        const section = tab.sections[s];
        await saveUiTabSectionControlCollection(stream, tab.index, section);

        await stream.write(`interface UI_Tab${tab.index}_Section${section.index} extends Section {${os.EOL}`);
        await stream.write(`    controls: UI_Tab${tab.index}_Section${section.index}_ControlCollection;${os.EOL}`);
        await stream.write(`    getName(): '${section.name}';${os.EOL}`);
        await stream.write(`}${os.EOL}${os.EOL}`);
    }
}

const saveUiTabSectionCollection = async (stream: fs.FileHandle, tab: Tab) => {
    const names = tab.sections.map(s => `UI_Tab${tab.index}_Section${s.index}`);
    await stream.write(`interface UI_Tab${tab.index}_SectionCollection extends Collection<${names.join(' | ')}> {${os.EOL}`);
    await stream.write(`    get(): [${names.join(', ')}];${os.EOL}`);
    for (let s in tab.sections) {
        const section = tab.sections[s];
        await stream.write(`    get(index: ${section.index}): UI_Tab${tab.index}_Section${section.index};${os.EOL}`);
        await stream.write(`    get(name: '${section.name}'): UI_Tab${tab.index}_Section${section.index};${os.EOL}`);
    }
    await stream.write(`    get(predicate: (value: ${names.join(' | ')}, index: number) => boolean): (${names.join(' | ')})[];${os.EOL}`);
    await stream.write(`    getLength(): ${tab.sections.length};${os.EOL}`);
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveUiTabs = async (stream: fs.FileHandle, tabs: Tab[]) => {
    for (let t in tabs) {
        const tab = tabs[t];
        await saveUiTabSections(stream, tab);
        await saveUiTabSectionCollection(stream, tab);

        await stream.write(`interface UI_Tab${tab.index} extends Tab {${os.EOL}`);
        await stream.write(`    sections: UI_Tab${tab.index}_SectionCollection;${os.EOL}`)
        if (tab.name) {
            await stream.write(`    getName(): '${tab.name}';${os.EOL}`);
        }
        else {
            await stream.write(`    getName(): undefined;${os.EOL}`);
        }
        await stream.write(`}${os.EOL}${os.EOL}`);
    }
}

const saveUiTabCollection = async (stream: fs.FileHandle, tabs: Tab[]) => {
    const names = tabs.map(t => `UI_Tab${t.index}`);
    await stream.write(`interface UI_TabCollection extends Collection<${names.join(' | ')}> {${os.EOL}`);
    await stream.write(`    get(): [${names.join(', ')}];${os.EOL}`);
    for (let t in tabs) {
        const tab = tabs[t];
        await stream.write(`    get(index: ${tab.index}): UI_Tab${tab.index};${os.EOL}`);
        await stream.write(`    get(name: '${tab.name}'): UI_Tab${tab.index};${os.EOL}`);
    }
    await stream.write(`    get(predicate: (value: ${names.join(' | ')}, index: number) => boolean): (${names.join(' | ')})[];${os.EOL}`);
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveUiControlCollection = async (stream: fs.FileHandle, controls: Control[]) => {
    const names = controls.map(c => `Control_${c.id}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`; 
    await stream.write(`interface UI_ControlCollection extends Collection<${union}> {${os.EOL}`);
    await stream.write(`    get(): ${list};${os.EOL}`);
    // TODO: Figure out if the order of controls is deterministic.
    await stream.write(`    get(index: number): (${union});${os.EOL}`);
    for (let c in controls) {
        const control = controls[c];
        await stream.write(`    get(name: '${control.id}'): Control_${control.id};${os.EOL}`);
    }
    await stream.write(`    get(predicate: (value: ${union}, index: number) => boolean): (${union})[];${os.EOL}`);
    await stream.write(`    getLength(): ${controls.length};${os.EOL}`)
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveUi = async (stream: fs.FileHandle, form: Form) => {
    await saveControls(stream, form.controls);
    await saveUiControlCollection(stream, form.controls);
    await saveUiTabs(stream, form.tabs);
    await saveUiTabCollection(stream, form.tabs);
    await stream.write(`interface UI extends FormContextUI {${os.EOL}`);
    await stream.write(`    controls: UI_ControlCollection;${os.EOL}`);
    await stream.write(`    tabs: UI_TabCollection;${os.EOL}`);
    await stream.write(`}${os.EOL}${os.EOL}`);
}

const saveTypeDef = async (file: string, form: Form) => {
    await mkdir(path.dirname(file));
    const stream = await fs.open(file, 'w');
    
    await saveImports(stream, form.attributes);
    await saveAttributes(stream, form.attributes);
    
    await saveData(stream, form);
    await saveUi(stream, form);
    

    await stream.write(`export default interface GeneratedFormContext extends FormContext {${os.EOL}`);
    await stream.write(`    data: Data;${os.EOL}`);
    await stream.write(`    ui: UI;${os.EOL}`);
    for (let a in form.attributes) {
        const attribute = form.attributes[a];
        if (attribute.name) {
            await stream.write(`    getAttribute(name: '${attribute.name}'): Attribute_${attribute.name};${os.EOL}`);
        }
    }
    await stream.write(`}${os.EOL}`);

    await stream.close();
}

const typegenForm = async (entity: string, projectForm: ProjectForm) => {
    const config = await getConfig();
    for (let t in projectForm.types) {
        const type = projectForm.types[t];
        const paths = await getPath(config).systemform(entity, projectForm.name, type.name);
        const file = paths.typedef;
        const fileXml = paths.form;
        const formXml = await loadFormXml(fileXml);
        
        const form: Form = { attributes: [], controls: [], entity: entity, tabs: [] };
        const attributes = new Map<string, string[]>();
        const tabs = formXml.form.tabs[0].tab;
        tabs.forEach((t, i) => {
            const tab: Tab = {
                index: i,
                label: '',
                name: t.$.name,
                sections: []
            };
            const columns = t.columns[0].column;
            let sectionIndex = 0;
            columns.forEach(c => {
                const sections = c.sections[0].section;
                sections.forEach(s => {
                    const section: Section = {
                        index: sectionIndex,
                        label: '',
                        name: s.$.name,
                        controls: []
                    };
                    const rows = s.rows?.[0].row ?? [];
                    rows.forEach(r => {
                        const cells = r.cell;
                        cells.forEach(cell => {
                            if (cell.control) {
                                const control = {
                                    id: cell.control[0].$.id,
                                    field: cell.control[0].$.datafieldname
                                }
                                form.controls.push(control);
                                section.controls.push(control);
                                if (control.field) {
                                    if (!attributes.has(control.field)) {
                                        attributes.set(control.field, []);
                                    }
                                    attributes.get(control.field)?.push(control.id);
                                }
                            }
                        });
                    });
                    
                    tab.sections.push(section);
                    sectionIndex++;
                });
            });
            form.tabs.push(tab);
        });
        form.attributes = Array.from(attributes).map(([name, controls]) => ({ name, controls }));

        await saveTypeDef(file, form);
    }
}

const typegen: Command = async (names: string[]) => {
    const entities = await getProjectEntities();
    names = names.length === 0 ? entities : names;
    for (let n in names) {
        const forms = await getEntityForms(names[n]);
        for (let j = 0; j < 1; j++) {
            typegenForm(names[n], forms[j]);
        }
    }
}
export default typegen;