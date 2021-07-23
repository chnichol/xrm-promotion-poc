import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-types';
import new_id from '../../../attributes/new_id/index';
import new_student from '../../../attributes/new_student/index';
import new_school from '../../../attributes/new_school/index';
import new_species from '../../../attributes/new_species/index';
import ownerid from '../../../attributes/ownerid/index';

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

interface Attribute_new_student_ControlCollection extends Collection<Control_new_student> {
    get(): (Control_new_student)[];
    get(index: number): (Control_new_student);
    get(name: 'new_student'): Control_new_student;
    get(predicate: (value: Control_new_student, index: number) => boolean): (Control_new_student)[];
    getLength(): 1;
}

interface Attribute_new_student extends new_student {
    controls: Attribute_new_student_ControlCollection;
}

interface Attribute_new_school_ControlCollection extends Collection<Control_new_school> {
    get(): (Control_new_school)[];
    get(index: number): (Control_new_school);
    get(name: 'new_school'): Control_new_school;
    get(predicate: (value: Control_new_school, index: number) => boolean): (Control_new_school)[];
    getLength(): 1;
}

interface Attribute_new_school extends new_school {
    controls: Attribute_new_school_ControlCollection;
}

interface Attribute_new_species_ControlCollection extends Collection<Control_new_species> {
    get(): (Control_new_species)[];
    get(index: number): (Control_new_species);
    get(name: 'new_species'): Control_new_species;
    get(predicate: (value: Control_new_species, index: number) => boolean): (Control_new_species)[];
    getLength(): 1;
}

interface Attribute_new_species extends new_species {
    controls: Attribute_new_species_ControlCollection;
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

interface Entity_AttributeCollection extends Collection<Attribute_new_id | Attribute_new_student | Attribute_new_school | Attribute_new_species | Attribute_ownerid> {
    get(): (Attribute_new_id | Attribute_new_student | Attribute_new_school | Attribute_new_species | Attribute_ownerid)[];
    get(index: number): (Attribute_new_id | Attribute_new_student | Attribute_new_school | Attribute_new_species | Attribute_ownerid);
    get(name: 'new_id'): Attribute_new_id;
    get(name: 'new_student'): Attribute_new_student;
    get(name: 'new_school'): Attribute_new_school;
    get(name: 'new_species'): Attribute_new_species;
    get(name: 'ownerid'): Attribute_ownerid;
    get(predicate: (value: Attribute_new_id | Attribute_new_student | Attribute_new_school | Attribute_new_species | Attribute_ownerid, index: number) => boolean): (Attribute_new_id | Attribute_new_student | Attribute_new_school | Attribute_new_species | Attribute_ownerid)[];
    getLength(): 5;
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

interface Control_new_student {
    getAttribute(): Attribute_new_student;
}

interface Control_new_school {
    getAttribute(): Attribute_new_school;
}

interface Control_new_species {
    getAttribute(): Attribute_new_species;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface UI_ControlCollection extends Collection<Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid> {
    get(): (Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid)[];
    get(index: number): (Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid);
    get(name: 'new_id'): Control_new_id;
    get(name: 'new_student'): Control_new_student;
    get(name: 'new_school'): Control_new_school;
    get(name: 'new_species'): Control_new_species;
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid, index: number) => boolean): (Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid)[];
    getLength(): 5;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid> {
    get(): [Control_new_id, Control_new_student, Control_new_school, Control_new_species, Control_ownerid];
    get(index: number): never;
    get(name: 'new_id'): Control_new_id;
    get(index: number): never;
    get(name: 'new_student'): Control_new_student;
    get(index: number): never;
    get(name: 'new_school'): Control_new_school;
    get(index: number): never;
    get(name: 'new_species'): Control_new_species;
    get(index: number): never;
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid, index: number) => boolean): (Control_new_id | Control_new_student | Control_new_school | Control_new_species | Control_ownerid)[];
    getLength(): 5;
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
    getAttribute(name: 'new_id'): Attribute_new_id;
    getAttribute(name: 'new_student'): Attribute_new_student;
    getAttribute(name: 'new_school'): Attribute_new_school;
    getAttribute(name: 'new_species'): Attribute_new_species;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
}
