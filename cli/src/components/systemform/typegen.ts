import { Project, SourceFile } from 'ts-morph';
import { getEntityForms } from '.';
import { parseFileXML } from '../../common';
import { getConfig, getPath } from '../../common/config';
import { generateMethod } from '../../common/typegen';
import { Command } from '../cli';
import { getProjectEntities } from '../entity';
import { Attribute, Control, Form, FormXML, ProjectForm, Section, Tab } from './types';

const loadFormXml = async (file: string) => {
    return await parseFileXML<FormXML>(file);
}

const saveImports = (attributes: Attribute[], sourceFile: SourceFile) => {
    sourceFile.addImportDeclaration({
        moduleSpecifier: 'xrm-types',
        namedImports: [ 'Collection', 'Entity', 'FormContext', 'FormContextData', 'FormContextUI', 'Section', 'Tab' ]
    });
    sourceFile.addImportDeclarations(attributes.map(attribute => ({
        moduleSpecifier: `../../../attributes/${attribute.name}`,
        defaultImport: attribute.name
    })));
}

const saveAttributeControlCollection = (attribute: Attribute, sourceFile: SourceFile) => {
    const names = attribute.controls.map(c => `Control_${c}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`; 
    sourceFile.addInterface({
        name: `Attribute_${attribute.name}_ControlCollection`,
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, list),
            generateMethod('get', { predicate: `(value: ${union}, index: number) => boolean` }, `(${union})[]`),
            generateMethod('getLength', undefined, attribute.controls.length.toString()),
        ].concat(
            attribute.controls.map(control => ([
                generateMethod('get', { index: 'number' }, `(${union})`),
                generateMethod('get', { name: `'${control}'` }, `Control_${control}`)
            ])).reduce((acc, val) => acc.concat(val), [])
        )
    });
}

const saveAttributes = (attributes: Attribute[], sourceFile: SourceFile) => {
    attributes.forEach(attribute => {
        if (attribute.name) {
            saveAttributeControlCollection(attribute, sourceFile);
            sourceFile.addInterface({
                name: `Attribute_${attribute.name}`,
                extends: [ attribute.name ],
                properties: [
                    { name: 'controls', type: `Attribute_${attribute.name}_ControlCollection` }
                ]
            })
        }
    });
}

const saveControls = (controls: Control[], sourceFile: SourceFile) => {
    controls.forEach(control => {
        const attribute = control.field ? `Attribute_${control.field}` : 'undefined';
        sourceFile.addInterface({
            name: `Control_${control.id}`,
            methods: [
                generateMethod('getAttribute', undefined, attribute)
            ]
        });
    });
}

const saveDataEntityAttributeCollection = (attributes: Attribute[], sourceFile: SourceFile) => {
    const names = attributes.map(a => `Attribute_${a.name}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`;
    sourceFile.addInterface({
        name: 'Entity_AttributeCollection',
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, list),
            generateMethod('get', { index: 'number' }, `(${union})`),
            generateMethod('get', { predicate: `(value: ${union}, index: number) => boolean` }, `(${union})[]`),
            generateMethod('getLength', undefined, attributes.length.toString())
        ].concat(
            attributes.filter(attribute => attribute.name).map(attribute => [
                generateMethod('get', { name: `'${attribute.name}'`}, `Attribute_${attribute.name}`)
            ]).reduce((acc, val) => acc.concat(val), [])
        )
    })
}

const saveDataEntity = (entity: string, attributes: Attribute[], sourceFile: SourceFile) => {
    saveDataEntityAttributeCollection(attributes, sourceFile);
    sourceFile.addInterface({
        name: 'DataEntity',
        extends: [ `Entity<${entity}>` ],
        properties: [
            { name: 'attributes', type: 'Entity_AttributeCollection' }
        ]
    });
}

const saveData = (form: Form, sourceFile: SourceFile) => {
    saveDataEntity(form.entity, form.attributes, sourceFile);
    sourceFile.addInterface({
        name: 'Data',
        extends: [ 'FormContextData' ],
        properties: [
            { name: 'entity', type: 'DataEntity' }
        ]
    });
}

const saveUiControlCollection = (controls: Control[], sourceFile: SourceFile) => {
    const names = controls.map(c => `Control_${c.id}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const list = names.length === 0 ? '[]' : `(${names.join(' | ')})[]`; 
    sourceFile.addInterface({
        name: 'UI_ControlCollection',
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, list),
            generateMethod('get', { index: 'number' }, `(${union})`), // TODO: Figure out if the order of controls is deterministic.
            generateMethod('get', { predicate: `(value: ${union}, index: number) => boolean` }, `(${union})[]`),
            generateMethod('getLength', undefined, controls.length.toString())
        ].concat(
            controls.map(control => [
                generateMethod('get', { name: `'${control.id}'`}, `Control_${control.id}`)
            ]).reduce((acc, val) => acc.concat(val), [])
        )
    });
}

const saveUiTabSectionControlCollection = (tabIndex: number, section: Section, sourceFile: SourceFile) => {
    const names = section.controls.map(c => `Control_${c.id}`);
    const union = names.length === 0 ? 'never' : `${names.join(' | ')}`;
    const tuple = names.length === 0 ? '[]' : `[${names.join(', ')}]`;
    sourceFile.addInterface({
        name: `UI_Tab${tabIndex}_Section${section.index}_ControlCollection`,
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, tuple),
            generateMethod('get', { predicate: `(value: ${union}, index: number) => boolean` }, `(${union})[]`),
            generateMethod('getLength', undefined, section.controls.length.toString())
        ].concat(
            ((controls) => {
                if (controls.length) {
                    return [
                        generateMethod('get', { index: 'number' }, 'never'),
                        generateMethod('get', { name: 'string' }, 'never')
                    ];
                }
                else {
                    return controls.map(control => [
                        generateMethod('get', { index: 'number' }, 'never'),
                        generateMethod('get', { name: `'${control.id}'` }, `Control_${control.id}`)
                    ]).reduce((acc, val) => acc.concat(val), [])
                }
            })(section.controls)
        )
    });
}

const saveUiTabSections = (tab: Tab, sourceFile: SourceFile) => {
    tab.sections.forEach(section => {
        saveUiTabSectionControlCollection(tab.index, section, sourceFile);
        sourceFile.addInterface({
            name: `UI_Tab${tab.index}_Section${section.index}`,
            extends: [ 'Section' ],
            properties: [
                { name: 'controls', type: `UI_Tab${tab.index}_Section${section.index}_ControlCollection` }
            ],
            methods: [
                generateMethod('getName', undefined, `'${section.name}'`)
            ]
        });
    });
}

const saveUiTabSectionCollection = (tab: Tab, sourceFile: SourceFile) => {
    const names = tab.sections.map(s => `UI_Tab${tab.index}_Section${s.index}`);
    const union = names.join(' | ');
    const tuple = `[${names.join(', ')}]`;
    sourceFile.addInterface({
        name: `UI_Tab${tab.index}_SectionCollection`,
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, tuple),
            generateMethod('get', { predicate: `` }, `(${union})[]`),
            generateMethod('getLength', undefined, tab.sections.length.toString())
        ].concat(
            tab.sections.map(section => [
                generateMethod('get', { index: section.index.toString() }, `UI_Tab${tab.index}_Section${section.index}`),
                generateMethod('get', { name: `'${section.name}'` }, `UI_Tab${tab.index}_Section${section.index}`)
            ]).reduce((acc, val) => acc.concat(val), [])
        )
    });
}

const saveUiTabs = (tabs: Tab[], sourceFile: SourceFile) => {
    tabs.forEach(tab => {
        saveUiTabSections(tab, sourceFile);
        saveUiTabSectionCollection(tab, sourceFile);
        sourceFile.addInterface({
            name: `UI_Tab${tab.index}`,
            extends: [ 'Tab' ],
            properties: [
                { name: 'sections', type: `UI_Tab${tab.index}_SectionCollection` }
            ],
            methods: [
                tab.name ? generateMethod('getName', undefined, `'${tab.name}'`) : generateMethod('getName', undefined, 'undefined')
            ]
        });
    });
}

const saveUiTabCollection = (tabs: Tab[], sourceFile: SourceFile) => {
    const names = tabs.map(t => `UI_Tab${t.index}`);
    const union = names.join(' | ');
    const tuple = `[${names.join(', ')}]`;
    sourceFile.addInterface({
        name: 'UI_TabCollection',
        extends: [ `Collection<${union}>` ],
        methods: [
            generateMethod('get', undefined, tuple),
            generateMethod('get', { predicate: `(value: ${union}, index: number) => boolean` }, `(${union})[]`),
        ].concat(
            tabs.map(tab => [
                generateMethod('get', { index: tab.index.toString() }, `UI_Tab${tab.index}`),
                generateMethod('get', { name: `'${tab.name}'` }, `UI_Tab${tab.index}`)
            ]).reduce((acc, val) => acc.concat(val), [])
        )
    });
}

const saveUi = (form: Form, sourceFile: SourceFile) => {
    saveControls(form.controls, sourceFile);
    saveUiControlCollection(form.controls, sourceFile);
    saveUiTabs(form.tabs, sourceFile);
    saveUiTabCollection(form.tabs, sourceFile);
    sourceFile.addInterface({
        name: 'UI',
        extends: [ 'FormContextUI' ],
        properties: [
            { name: 'controls', type: 'UI_ControlCollection' },
            { name: 'tabs', type: 'UI_TabCollection' }
        ]
    });
}

const saveTypeDef = (form: Form, sourceFile: SourceFile) => {
    saveImports(form.attributes, sourceFile);
    saveAttributes(form.attributes, sourceFile);
    saveData(form, sourceFile);
    saveUi(form, sourceFile);
    sourceFile.addInterface({
        name: 'GeneratedFormContext',
        extends: [ 'FormContext' ],
        isDefaultExport: true,
        properties: [
            { name: 'data', type: 'Data' },
            { name: 'ui', type: 'UI' }
        ],
        methods: form.attributes.map(attribute => [
            generateMethod('getAttribute', { name: `'${attribute.name}'`}, `Attribute_${attribute.name}`)
        ]).reduce((acc, val) => acc.concat(val), [])
    });
}

const typegenForm = async (entity: string, projectForm: ProjectForm, project: Project) => {
    const config = await getConfig();
    for (const t in projectForm.types) {
        const type = projectForm.types[t];
        const paths = getPath(config).systemform(entity, projectForm.name, type.name);
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

        const sourceFile = project.createSourceFile(file, undefined, { overwrite: true });
        saveTypeDef(form, sourceFile);
        await sourceFile.save();
    }
}

const typegen: Command = async (names: string[]) => {
    names = names.length === 0 ? await getProjectEntities() : names;
    const project = new Project();
    for (const n in names) {
        const forms = await getEntityForms(names[n]);
        for (let j = 0; j < 1; j++) {
            typegenForm(names[n], forms[j], project);
        }
    }
    await project.save();
}
export default typegen;