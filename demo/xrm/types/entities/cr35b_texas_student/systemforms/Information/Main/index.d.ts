import { Collection, Control, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from "xrm-types";
import cr35b_student_name from "../../../attributes/cr35b_student_name";
import new_middlename from "../../../attributes/new_middlename";
import new_lastname from "../../../attributes/new_lastname";
import new_studentid from "../../../attributes/new_studentid";
import new_school2 from "../../../attributes/new_school2";
import new_saplingcount from "../../../attributes/new_saplingcount";
import new_targetattained from "../../../attributes/new_targetattained";
import ownerid from "../../../attributes/ownerid";

interface Attribute_cr35b_student_name_ControlCollection extends Collection<Control_cr35b_student_name> {
    get(): (Control_cr35b_student_name)[];
    get(predicate: (value: Control_cr35b_student_name, index: number) => boolean): (Control_cr35b_student_name)[];
    getLength(): 1;
    get(index: number): (Control_cr35b_student_name);
    get(name: 'cr35b_student_name'): Control_cr35b_student_name;
}

interface Attribute_cr35b_student_name extends cr35b_student_name {
    controls: Attribute_cr35b_student_name_ControlCollection;
}

interface Attribute_new_middlename_ControlCollection extends Collection<Control_new_middlename> {
    get(): (Control_new_middlename)[];
    get(predicate: (value: Control_new_middlename, index: number) => boolean): (Control_new_middlename)[];
    getLength(): 1;
    get(index: number): (Control_new_middlename);
    get(name: 'new_middlename'): Control_new_middlename;
}

interface Attribute_new_middlename extends new_middlename {
    controls: Attribute_new_middlename_ControlCollection;
}

interface Attribute_new_lastname_ControlCollection extends Collection<Control_new_lastname> {
    get(): (Control_new_lastname)[];
    get(predicate: (value: Control_new_lastname, index: number) => boolean): (Control_new_lastname)[];
    getLength(): 1;
    get(index: number): (Control_new_lastname);
    get(name: 'new_lastname'): Control_new_lastname;
}

interface Attribute_new_lastname extends new_lastname {
    controls: Attribute_new_lastname_ControlCollection;
}

interface Attribute_new_studentid_ControlCollection extends Collection<Control_new_studentid> {
    get(): (Control_new_studentid)[];
    get(predicate: (value: Control_new_studentid, index: number) => boolean): (Control_new_studentid)[];
    getLength(): 1;
    get(index: number): (Control_new_studentid);
    get(name: 'new_studentid'): Control_new_studentid;
}

interface Attribute_new_studentid extends new_studentid {
    controls: Attribute_new_studentid_ControlCollection;
}

interface Attribute_new_school2_ControlCollection extends Collection<Control_new_school2> {
    get(): (Control_new_school2)[];
    get(predicate: (value: Control_new_school2, index: number) => boolean): (Control_new_school2)[];
    getLength(): 1;
    get(index: number): (Control_new_school2);
    get(name: 'new_school2'): Control_new_school2;
}

interface Attribute_new_school2 extends new_school2 {
    controls: Attribute_new_school2_ControlCollection;
}

interface Attribute_new_saplingcount_ControlCollection extends Collection<Control_new_saplingcount> {
    get(): (Control_new_saplingcount)[];
    get(predicate: (value: Control_new_saplingcount, index: number) => boolean): (Control_new_saplingcount)[];
    getLength(): 1;
    get(index: number): (Control_new_saplingcount);
    get(name: 'new_saplingcount'): Control_new_saplingcount;
}

interface Attribute_new_saplingcount extends new_saplingcount {
    controls: Attribute_new_saplingcount_ControlCollection;
}

interface Attribute_new_targetattained_ControlCollection extends Collection<Control_new_targetattained> {
    get(): (Control_new_targetattained)[];
    get(predicate: (value: Control_new_targetattained, index: number) => boolean): (Control_new_targetattained)[];
    getLength(): 1;
    get(index: number): (Control_new_targetattained);
    get(name: 'new_targetattained'): Control_new_targetattained;
}

interface Attribute_new_targetattained extends new_targetattained {
    controls: Attribute_new_targetattained_ControlCollection;
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

interface Entity_AttributeCollection extends Collection<Attribute_cr35b_student_name | Attribute_new_middlename | Attribute_new_lastname | Attribute_new_studentid | Attribute_new_school2 | Attribute_new_saplingcount | Attribute_new_targetattained | Attribute_ownerid> {
    get(): (Attribute_cr35b_student_name | Attribute_new_middlename | Attribute_new_lastname | Attribute_new_studentid | Attribute_new_school2 | Attribute_new_saplingcount | Attribute_new_targetattained | Attribute_ownerid)[];
    get(index: number): (Attribute_cr35b_student_name | Attribute_new_middlename | Attribute_new_lastname | Attribute_new_studentid | Attribute_new_school2 | Attribute_new_saplingcount | Attribute_new_targetattained | Attribute_ownerid);
    get(predicate: (value: Attribute_cr35b_student_name | Attribute_new_middlename | Attribute_new_lastname | Attribute_new_studentid | Attribute_new_school2 | Attribute_new_saplingcount | Attribute_new_targetattained | Attribute_ownerid, index: number) => boolean): (Attribute_cr35b_student_name | Attribute_new_middlename | Attribute_new_lastname | Attribute_new_studentid | Attribute_new_school2 | Attribute_new_saplingcount | Attribute_new_targetattained | Attribute_ownerid)[];
    getLength(): 8;
    get(name: 'cr35b_student_name'): Attribute_cr35b_student_name;
    get(name: 'new_middlename'): Attribute_new_middlename;
    get(name: 'new_lastname'): Attribute_new_lastname;
    get(name: 'new_studentid'): Attribute_new_studentid;
    get(name: 'new_school2'): Attribute_new_school2;
    get(name: 'new_saplingcount'): Attribute_new_saplingcount;
    get(name: 'new_targetattained'): Attribute_new_targetattained;
    get(name: 'ownerid'): Attribute_ownerid;
}

interface DataEntity extends Entity<'cr35b_texas_student'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_cr35b_student_name extends Control {
    getAttribute(): Attribute_cr35b_student_name;
}

interface Control_new_middlename extends Control {
    getAttribute(): Attribute_new_middlename;
}

interface Control_new_lastname extends Control {
    getAttribute(): Attribute_new_lastname;
}

interface Control_new_studentid extends Control {
    getAttribute(): Attribute_new_studentid;
}

interface Control_new_school2 extends Control {
    getAttribute(): Attribute_new_school2;
}

interface Control_new_saplingcount extends Control {
    getAttribute(): Attribute_new_saplingcount;
}

interface Control_new_targetattained extends Control {
    getAttribute(): Attribute_new_targetattained;
}

interface Control_ownerid extends Control {
    getAttribute(): Attribute_ownerid;
}

interface Control_Sapling_Subgrid extends Control {
    getAttribute(): undefined;
}

interface UI_ControlCollection extends Collection<Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid> {
    get(): (Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid)[];
    get(index: number): (Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid);
    get(predicate: (value: Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid, index: number) => boolean): (Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid)[];
    getLength(): 9;
    get(name: 'cr35b_student_name'): Control_cr35b_student_name;
    get(name: 'new_middlename'): Control_new_middlename;
    get(name: 'new_lastname'): Control_new_lastname;
    get(name: 'new_studentid'): Control_new_studentid;
    get(name: 'new_school2'): Control_new_school2;
    get(name: 'new_saplingcount'): Control_new_saplingcount;
    get(name: 'new_targetattained'): Control_new_targetattained;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'Sapling_Subgrid'): Control_Sapling_Subgrid;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid> {
    get(): [Control_cr35b_student_name, Control_new_middlename, Control_new_lastname, Control_new_studentid, Control_new_school2, Control_new_saplingcount, Control_new_targetattained, Control_ownerid, Control_Sapling_Subgrid];
    get(predicate: (value: Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid, index: number) => boolean): (Control_cr35b_student_name | Control_new_middlename | Control_new_lastname | Control_new_studentid | Control_new_school2 | Control_new_saplingcount | Control_new_targetattained | Control_ownerid | Control_Sapling_Subgrid)[];
    getLength(): 9;
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
    getName(): 'Student_Details';
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
    get(index: 0): UI_Tab0;
    get(name: 'Student_Details'): UI_Tab0;
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'cr35b_student_name'): Attribute_cr35b_student_name;
    getAttribute(name: 'new_middlename'): Attribute_new_middlename;
    getAttribute(name: 'new_lastname'): Attribute_new_lastname;
    getAttribute(name: 'new_studentid'): Attribute_new_studentid;
    getAttribute(name: 'new_school2'): Attribute_new_school2;
    getAttribute(name: 'new_saplingcount'): Attribute_new_saplingcount;
    getAttribute(name: 'new_targetattained'): Attribute_new_targetattained;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getControl(name: 'cr35b_student_name'): Control_cr35b_student_name;
    getControl(name: 'new_middlename'): Control_new_middlename;
    getControl(name: 'new_lastname'): Control_new_lastname;
    getControl(name: 'new_studentid'): Control_new_studentid;
    getControl(name: 'new_school2'): Control_new_school2;
    getControl(name: 'new_saplingcount'): Control_new_saplingcount;
    getControl(name: 'new_targetattained'): Control_new_targetattained;
    getControl(name: 'ownerid'): Control_ownerid;
    getControl(name: 'Sapling_Subgrid'): Control_Sapling_Subgrid;
}
