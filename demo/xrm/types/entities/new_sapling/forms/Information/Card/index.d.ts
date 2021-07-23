import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-types';
import statuscode from '../../../attributes/statuscode/index';
import new_id from '../../../attributes/new_id/index';
import ownerid from '../../../attributes/ownerid/index';
import createdon from '../../../attributes/createdon/index';

interface Attribute_statuscode_ControlCollection extends Collection<Control_statuscode> {
    get(): (Control_statuscode)[];
    get(index: number): (Control_statuscode);
    get(name: 'statuscode'): Control_statuscode;
    get(predicate: (value: Control_statuscode, index: number) => boolean): (Control_statuscode)[];
    getLength(): 1;
}

interface Attribute_statuscode extends statuscode {
    controls: Attribute_statuscode_ControlCollection;
}

interface Attribute_new_id_ControlCollection extends Collection<Control_new_id> {
    get(): (Control_new_id)[];
    get(index: number): (Control_new_id);
    get(name: 'new_id'): Control_new_id;
    get(predicate: (value: Control_new_id, index: number) => boolean): (Control_new_id)[];
    getLength(): 1;
}

interface Attribute_new_id extends new_id {
    controls: Attribute_new_id_ControlCollection;
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

interface Attribute_createdon_ControlCollection extends Collection<Control_createdon> {
    get(): (Control_createdon)[];
    get(index: number): (Control_createdon);
    get(name: 'createdon'): Control_createdon;
    get(predicate: (value: Control_createdon, index: number) => boolean): (Control_createdon)[];
    getLength(): 1;
}

interface Attribute_createdon extends createdon {
    controls: Attribute_createdon_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_statuscode | Attribute_new_id | Attribute_ownerid | Attribute_createdon> {
    get(): (Attribute_statuscode | Attribute_new_id | Attribute_ownerid | Attribute_createdon)[];
    get(index: number): (Attribute_statuscode | Attribute_new_id | Attribute_ownerid | Attribute_createdon);
    get(name: 'statuscode'): Attribute_statuscode;
    get(name: 'new_id'): Attribute_new_id;
    get(name: 'ownerid'): Attribute_ownerid;
    get(name: 'createdon'): Attribute_createdon;
    get(predicate: (value: Attribute_statuscode | Attribute_new_id | Attribute_ownerid | Attribute_createdon, index: number) => boolean): (Attribute_statuscode | Attribute_new_id | Attribute_ownerid | Attribute_createdon)[];
    getLength(): 4;
}

interface DataEntity extends Entity<'new_sapling'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_statuscode {
    getAttribute(): Attribute_statuscode;
}

interface Control_new_id {
    getAttribute(): Attribute_new_id;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface Control_createdon {
    getAttribute(): Attribute_createdon;
}

interface UI_ControlCollection extends Collection<Control_statuscode | Control_new_id | Control_ownerid | Control_createdon> {
    get(): (Control_statuscode | Control_new_id | Control_ownerid | Control_createdon)[];
    get(index: number): (Control_statuscode | Control_new_id | Control_ownerid | Control_createdon);
    get(name: 'statuscode'): Control_statuscode;
    get(name: 'new_id'): Control_new_id;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'createdon'): Control_createdon;
    get(predicate: (value: Control_statuscode | Control_new_id | Control_ownerid | Control_createdon, index: number) => boolean): (Control_statuscode | Control_new_id | Control_ownerid | Control_createdon)[];
    getLength(): 4;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<never> {
    get(): [];
    get(index: number): never;
    get(name: string): never;
    get(predicate: (value: never, index: number) => boolean): (never)[];
    getLength(): 0;
}

interface UI_Tab0_Section0 extends Section {
    controls: UI_Tab0_Section0_ControlCollection;
    getName(): 'ColorStrip';
}

interface UI_Tab0_Section1_ControlCollection extends Collection<Control_statuscode> {
    get(): [Control_statuscode];
    get(index: number): never;
    get(name: 'statuscode'): Control_statuscode;
    get(predicate: (value: Control_statuscode, index: number) => boolean): (Control_statuscode)[];
    getLength(): 1;
}

interface UI_Tab0_Section1 extends Section {
    controls: UI_Tab0_Section1_ControlCollection;
    getName(): 'CardHeader';
}

interface UI_Tab0_Section2_ControlCollection extends Collection<Control_new_id> {
    get(): [Control_new_id];
    get(index: number): never;
    get(name: 'new_id'): Control_new_id;
    get(predicate: (value: Control_new_id, index: number) => boolean): (Control_new_id)[];
    getLength(): 1;
}

interface UI_Tab0_Section2 extends Section {
    controls: UI_Tab0_Section2_ControlCollection;
    getName(): 'CardDetails';
}

interface UI_Tab0_Section3_ControlCollection extends Collection<Control_ownerid | Control_createdon> {
    get(): [Control_ownerid, Control_createdon];
    get(index: number): never;
    get(name: 'ownerid'): Control_ownerid;
    get(index: number): never;
    get(name: 'createdon'): Control_createdon;
    get(predicate: (value: Control_ownerid | Control_createdon, index: number) => boolean): (Control_ownerid | Control_createdon)[];
    getLength(): 2;
}

interface UI_Tab0_Section3 extends Section {
    controls: UI_Tab0_Section3_ControlCollection;
    getName(): 'CardFooter';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3> {
    get(): [UI_Tab0_Section0, UI_Tab0_Section1, UI_Tab0_Section2, UI_Tab0_Section3];
    get(index: 0): UI_Tab0_Section0;
    get(name: 'ColorStrip'): UI_Tab0_Section0;
    get(index: 1): UI_Tab0_Section1;
    get(name: 'CardHeader'): UI_Tab0_Section1;
    get(index: 2): UI_Tab0_Section2;
    get(name: 'CardDetails'): UI_Tab0_Section2;
    get(index: 3): UI_Tab0_Section3;
    get(name: 'CardFooter'): UI_Tab0_Section3;
    get(predicate: (value: UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3, index: number) => boolean): (UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3)[];
    getLength(): 4;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): 'general';
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(index: 0): UI_Tab0;
    get(name: 'general'): UI_Tab0;
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'statuscode'): Attribute_statuscode;
    getAttribute(name: 'new_id'): Attribute_new_id;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getAttribute(name: 'createdon'): Attribute_createdon;
}
