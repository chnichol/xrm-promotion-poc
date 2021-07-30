import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from "xrm-types";
import new_id from "../../../attributes/new_id";
import ownerid from "../../../attributes/ownerid";

interface Attribute_new_id_ControlCollection extends Collection<Control_new_id> {
    get(): (Control_new_id)[];
    get(predicate: (value: Control_new_id, index: number) => boolean): (Control_new_id)[];
    getLength(): 1;
    get(index: number): (Control_new_id);
    get(name: 'new_id'): Control_new_id;
}

interface Attribute_new_id extends new_id {
    controls: Attribute_new_id_ControlCollection;
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

interface Entity_AttributeCollection extends Collection<Attribute_new_id | Attribute_ownerid> {
    get(): (Attribute_new_id | Attribute_ownerid)[];
    get(index: number): (Attribute_new_id | Attribute_ownerid);
    get(predicate: (value: Attribute_new_id | Attribute_ownerid, index: number) => boolean): (Attribute_new_id | Attribute_ownerid)[];
    getLength(): 2;
    get(name: 'new_id'): Attribute_new_id;
    get(name: 'ownerid'): Attribute_ownerid;
}

interface DataEntity extends Entity<'new_sapling'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_new_id {
    getAttribute(): Attribute_new_id;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface UI_ControlCollection extends Collection<Control_new_id | Control_ownerid> {
    get(): (Control_new_id | Control_ownerid)[];
    get(index: number): (Control_new_id | Control_ownerid);
    get(predicate: (value: Control_new_id | Control_ownerid, index: number) => boolean): (Control_new_id | Control_ownerid)[];
    getLength(): 2;
    get(name: 'new_id'): Control_new_id;
    get(name: 'ownerid'): Control_ownerid;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_new_id | Control_ownerid> {
    get(): [Control_new_id, Control_ownerid];
    get(predicate: (value: Control_new_id | Control_ownerid, index: number) => boolean): (Control_new_id | Control_ownerid)[];
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
    getAttribute(name: 'new_id'): Attribute_new_id;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
}
