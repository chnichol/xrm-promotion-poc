import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-api';
import new_name from '../../../attributes/new_name/index';
import ownerid from '../../../attributes/ownerid/index';

interface Attribute_new_name_ControlCollection extends Collection<Control_new_name> {
    get(): (Control_new_name)[];
    get(index: number): (Control_new_name);
    get(name: 'new_name'): Control_new_name;
    get(predicate: (value: Control_new_name, index: number) => boolean): (Control_new_name)[];
    getLength(): 1;
}

interface Attribute_new_name extends new_name {
    controls: Attribute_new_name_ControlCollection;
}

interface Attribute_ownerid_ControlCollection extends Collection<Control_ownerid> {
    get(): (Control_ownerid)[];
    get(index: number): (Control_ownerid);
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_ownerid, index: number) => boolean): (Control_ownerid)[];
    getLength(): 1;
}

interface Attribute_ownerid extends ownerid {
    controls: Attribute_ownerid_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_new_name | Attribute_ownerid> {
    get(): (Attribute_new_name | Attribute_ownerid)[];
    get(index: number): (Attribute_new_name | Attribute_ownerid);
    get(name: 'new_name'): Attribute_new_name;
    get(name: 'ownerid'): Attribute_ownerid;
    get(predicate: (value: Attribute_new_name | Attribute_ownerid, index: number) => boolean): (Attribute_new_name | Attribute_ownerid)[];
    getLength(): 2;
}

interface DataEntity extends Entity<'new_student'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_new_name {
    getAttribute(): Attribute_new_name;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface UI_ControlCollection extends Collection<Control_new_name | Control_ownerid> {
    get(): (Control_new_name | Control_ownerid)[];
    get(index: number): (Control_new_name | Control_ownerid);
    get(name: 'new_name'): Control_new_name;
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_new_name | Control_ownerid, index: number) => boolean): (Control_new_name | Control_ownerid)[];
    getLength(): 2;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_new_name | Control_ownerid> {
    get(): [Control_new_name, Control_ownerid];
    get(index: number): never;
    get(name: 'new_name'): Control_new_name;
    get(index: number): never;
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_new_name | Control_ownerid, index: number) => boolean): (Control_new_name | Control_ownerid)[];
    getLength(): 2;
}

interface UI_Tab0_Section0 extends Section {
    controls: UI_Tab0_Section0_ControlCollection;
    getName(): 'undefined';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0> {
    get(): [UI_Tab0_Section0];
    get(index: 0): UI_Tab0_Section0;
    get(name: 'undefined'): UI_Tab0_Section0;
    get(predicate: (value: UI_Tab0_Section0, index: number) => boolean): (UI_Tab0_Section0)[];
    getLength(): 1;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): undefined;
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(index: 0): UI_Tab0;
    get(name: 'undefined'): UI_Tab0;
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'new_name'): Attribute_new_name;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
}
