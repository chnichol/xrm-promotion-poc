import { Collection, Control, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from "xrm-types";
import cr35b_sapling_name from "../../../attributes/cr35b_sapling_name";
import new_speciesplanted from "../../../attributes/new_speciesplanted";
import new_cr35b_texas_student from "../../../attributes/new_cr35b_texas_student";
import new_cr35b_texas_school from "../../../attributes/new_cr35b_texas_school";
import ownerid from "../../../attributes/ownerid";

interface Attribute_cr35b_sapling_name_ControlCollection extends Collection<Control_cr35b_sapling_name> {
    get(): (Control_cr35b_sapling_name)[];
    get(predicate: (value: Control_cr35b_sapling_name, index: number) => boolean): (Control_cr35b_sapling_name)[];
    getLength(): 1;
    get(index: number): (Control_cr35b_sapling_name);
    get(name: 'cr35b_sapling_name'): Control_cr35b_sapling_name;
}

interface Attribute_cr35b_sapling_name extends cr35b_sapling_name {
    controls: Attribute_cr35b_sapling_name_ControlCollection;
}

interface Attribute_new_speciesplanted_ControlCollection extends Collection<Control_new_speciesplanted> {
    get(): (Control_new_speciesplanted)[];
    get(predicate: (value: Control_new_speciesplanted, index: number) => boolean): (Control_new_speciesplanted)[];
    getLength(): 1;
    get(index: number): (Control_new_speciesplanted);
    get(name: 'new_speciesplanted'): Control_new_speciesplanted;
}

interface Attribute_new_speciesplanted extends new_speciesplanted {
    controls: Attribute_new_speciesplanted_ControlCollection;
}

interface Attribute_new_cr35b_texas_student_ControlCollection extends Collection<Control_new_cr35b_texas_student> {
    get(): (Control_new_cr35b_texas_student)[];
    get(predicate: (value: Control_new_cr35b_texas_student, index: number) => boolean): (Control_new_cr35b_texas_student)[];
    getLength(): 1;
    get(index: number): (Control_new_cr35b_texas_student);
    get(name: 'new_cr35b_texas_student'): Control_new_cr35b_texas_student;
}

interface Attribute_new_cr35b_texas_student extends new_cr35b_texas_student {
    controls: Attribute_new_cr35b_texas_student_ControlCollection;
}

interface Attribute_new_cr35b_texas_school_ControlCollection extends Collection<Control_new_cr35b_texas_school> {
    get(): (Control_new_cr35b_texas_school)[];
    get(predicate: (value: Control_new_cr35b_texas_school, index: number) => boolean): (Control_new_cr35b_texas_school)[];
    getLength(): 1;
    get(index: number): (Control_new_cr35b_texas_school);
    get(name: 'new_cr35b_texas_school'): Control_new_cr35b_texas_school;
}

interface Attribute_new_cr35b_texas_school extends new_cr35b_texas_school {
    controls: Attribute_new_cr35b_texas_school_ControlCollection;
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

interface Entity_AttributeCollection extends Collection<Attribute_cr35b_sapling_name | Attribute_new_speciesplanted | Attribute_new_cr35b_texas_student | Attribute_new_cr35b_texas_school | Attribute_ownerid> {
    get(): (Attribute_cr35b_sapling_name | Attribute_new_speciesplanted | Attribute_new_cr35b_texas_student | Attribute_new_cr35b_texas_school | Attribute_ownerid)[];
    get(index: number): (Attribute_cr35b_sapling_name | Attribute_new_speciesplanted | Attribute_new_cr35b_texas_student | Attribute_new_cr35b_texas_school | Attribute_ownerid);
    get(predicate: (value: Attribute_cr35b_sapling_name | Attribute_new_speciesplanted | Attribute_new_cr35b_texas_student | Attribute_new_cr35b_texas_school | Attribute_ownerid, index: number) => boolean): (Attribute_cr35b_sapling_name | Attribute_new_speciesplanted | Attribute_new_cr35b_texas_student | Attribute_new_cr35b_texas_school | Attribute_ownerid)[];
    getLength(): 5;
    get(name: 'cr35b_sapling_name'): Attribute_cr35b_sapling_name;
    get(name: 'new_speciesplanted'): Attribute_new_speciesplanted;
    get(name: 'new_cr35b_texas_student'): Attribute_new_cr35b_texas_student;
    get(name: 'new_cr35b_texas_school'): Attribute_new_cr35b_texas_school;
    get(name: 'ownerid'): Attribute_ownerid;
}

interface DataEntity extends Entity<'cr35b_sapling'> {
    attributes: Entity_AttributeCollection;
}

interface Data extends FormContextData {
    entity: DataEntity;
}

interface Control_cr35b_sapling_name extends Control {
    getAttribute(): Attribute_cr35b_sapling_name;
}

interface Control_new_speciesplanted extends Control {
    getAttribute(): Attribute_new_speciesplanted;
}

interface Control_new_cr35b_texas_student extends Control {
    getAttribute(): Attribute_new_cr35b_texas_student;
}

interface Control_new_cr35b_texas_school extends Control {
    getAttribute(): Attribute_new_cr35b_texas_school;
}

interface Control_ownerid extends Control {
    getAttribute(): Attribute_ownerid;
}

interface UI_ControlCollection extends Collection<Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid> {
    get(): (Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid)[];
    get(index: number): (Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid);
    get(predicate: (value: Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid, index: number) => boolean): (Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid)[];
    getLength(): 5;
    get(name: 'cr35b_sapling_name'): Control_cr35b_sapling_name;
    get(name: 'new_speciesplanted'): Control_new_speciesplanted;
    get(name: 'new_cr35b_texas_student'): Control_new_cr35b_texas_student;
    get(name: 'new_cr35b_texas_school'): Control_new_cr35b_texas_school;
    get(name: 'ownerid'): Control_ownerid;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid> {
    get(): [Control_cr35b_sapling_name, Control_new_speciesplanted, Control_new_cr35b_texas_student, Control_new_cr35b_texas_school, Control_ownerid];
    get(predicate: (value: Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid, index: number) => boolean): (Control_cr35b_sapling_name | Control_new_speciesplanted | Control_new_cr35b_texas_student | Control_new_cr35b_texas_school | Control_ownerid)[];
    getLength(): 5;
    get(index: number): never;
    get(name: string): never;
}

interface UI_Tab0_Section0 extends Section {
    controls: UI_Tab0_Section0_ControlCollection;
    getName(): 'Sapling_Info';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0> {
    get(): [UI_Tab0_Section0];
    get(predicate): (UI_Tab0_Section0)[];
    getLength(): 1;
    get(index: 0): UI_Tab0_Section0;
    get(name: 'Sapling_Info'): UI_Tab0_Section0;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): 'Sapling_Details';
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
    get(index: 0): UI_Tab0;
    get(name: 'Sapling_Details'): UI_Tab0;
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'cr35b_sapling_name'): Attribute_cr35b_sapling_name;
    getAttribute(name: 'new_speciesplanted'): Attribute_new_speciesplanted;
    getAttribute(name: 'new_cr35b_texas_student'): Attribute_new_cr35b_texas_student;
    getAttribute(name: 'new_cr35b_texas_school'): Attribute_new_cr35b_texas_school;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getControl(name: 'cr35b_sapling_name'): Control_cr35b_sapling_name;
    getControl(name: 'new_speciesplanted'): Control_new_speciesplanted;
    getControl(name: 'new_cr35b_texas_student'): Control_new_cr35b_texas_student;
    getControl(name: 'new_cr35b_texas_school'): Control_new_cr35b_texas_school;
    getControl(name: 'ownerid'): Control_ownerid;
}
