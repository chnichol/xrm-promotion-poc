import { Collection, Control, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from "xrm-types";
import cr35b_texas_school_name from "../../../attributes/cr35b_texas_school_name";
import ownerid from "../../../attributes/ownerid";

interface Attribute_cr35b_texas_school_name_ControlCollection extends Collection<Control_cr35b_texas_school_name> {
    get(): (Control_cr35b_texas_school_name)[];
    get(predicate: (value: Control_cr35b_texas_school_name, index: number) => boolean): (Control_cr35b_texas_school_name)[];
    getLength(): 1;
    get(index: number): (Control_cr35b_texas_school_name);
    get(name: 'cr35b_texas_school_name'): Control_cr35b_texas_school_name;
}

interface Attribute_cr35b_texas_school_name extends cr35b_texas_school_name {
    controls: Attribute_cr35b_texas_school_name_ControlCollection;
}

interface Attribute_ownerid_ControlCollection extends Collection<Control_ownerid> {
    get(): (Control_ownerid)[];
    get(predicate: (value: Control_ownerid, index: number) => boolean): (Control_ownerid)[];
    getLength(): 1;
    get(index: number): (Control_ownerid);
    get(name: 'ownerid'): Control_ownerid;
}

interface Attribute_ownerid extends ownerid {
    controls: Attribute_ownerid_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_cr35b_texas_school_name | Attribute_ownerid> {
    get(): (Attribute_cr35b_texas_school_name | Attribute_ownerid)[];
    get(index: number): (Attribute_cr35b_texas_school_name | Attribute_ownerid);
    get(predicate: (value: Attribute_cr35b_texas_school_name | Attribute_ownerid, index: number) => boolean): (Attribute_cr35b_texas_school_name | Attribute_ownerid)[];
    getLength(): 2;
    get(name: 'cr35b_texas_school_name'): Attribute_cr35b_texas_school_name;
    get(name: 'ownerid'): Attribute_ownerid;
}

interface DataEntity extends Entity<'cr35b_texas_school'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_cr35b_texas_school_name extends Control {
    getAttribute(): Attribute_cr35b_texas_school_name;
}

interface Control_ownerid extends Control {
    getAttribute(): Attribute_ownerid;
}

interface UI_ControlCollection extends Collection<Control_cr35b_texas_school_name | Control_ownerid> {
    get(): (Control_cr35b_texas_school_name | Control_ownerid)[];
    get(index: number): (Control_cr35b_texas_school_name | Control_ownerid);
    get(predicate: (value: Control_cr35b_texas_school_name | Control_ownerid, index: number) => boolean): (Control_cr35b_texas_school_name | Control_ownerid)[];
    getLength(): 2;
    get(name: 'cr35b_texas_school_name'): Control_cr35b_texas_school_name;
    get(name: 'ownerid'): Control_ownerid;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_cr35b_texas_school_name | Control_ownerid> {
    get(): [Control_cr35b_texas_school_name, Control_ownerid];
    get(predicate: (value: Control_cr35b_texas_school_name | Control_ownerid, index: number) => boolean): (Control_cr35b_texas_school_name | Control_ownerid)[];
    getLength(): 2;
    get(index: number): never;
    get(name: string): never;
}

interface UI_Tab0_Section0 extends Section {
    controls: UI_Tab0_Section0_ControlCollection;
    getName(): 'undefined';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0> {
    get(): [UI_Tab0_Section0];
    get(predicate): (UI_Tab0_Section0)[];
    getLength(): 1;
    get(index: 0): UI_Tab0_Section0;
    get(name: 'undefined'): UI_Tab0_Section0;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): undefined;
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
    get(index: 0): UI_Tab0;
    get(name: 'undefined'): UI_Tab0;
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'cr35b_texas_school_name'): Attribute_cr35b_texas_school_name;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getControl(name: 'cr35b_texas_school_name'): Control_cr35b_texas_school_name;
    getControl(name: 'ownerid'): Control_ownerid;
}
