import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-types';
import new_name from '../../../attributes/new_name/index';
import new_school from '../../../attributes/new_school/index';
import new_plantedsaplings from '../../../attributes/new_plantedsaplings/index';
import ownerid from '../../../attributes/ownerid/index';
import new_numberoftimesimcool from '../../../attributes/new_numberoftimesimcool/index';

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

interface Attribute_new_plantedsaplings_ControlCollection extends Collection<Control_new_plantedsaplings> {
    get(): (Control_new_plantedsaplings)[];
    get(index: number): (Control_new_plantedsaplings);
    get(name: 'new_plantedsaplings'): Control_new_plantedsaplings;
    get(predicate: (value: Control_new_plantedsaplings, index: number) => boolean): (Control_new_plantedsaplings)[];
    getLength(): 1;
}

interface Attribute_new_plantedsaplings extends new_plantedsaplings {
    controls: Attribute_new_plantedsaplings_ControlCollection;
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

interface Attribute_new_numberoftimesimcool_ControlCollection extends Collection<Control_new_numberoftimesimcool> {
    get(): (Control_new_numberoftimesimcool)[];
    get(index: number): (Control_new_numberoftimesimcool);
    get(name: 'new_numberoftimesimcool'): Control_new_numberoftimesimcool;
    get(predicate: (value: Control_new_numberoftimesimcool, index: number) => boolean): (Control_new_numberoftimesimcool)[];
    getLength(): 1;
}

interface Attribute_new_numberoftimesimcool extends new_numberoftimesimcool {
    controls: Attribute_new_numberoftimesimcool_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_new_name | Attribute_new_school | Attribute_new_plantedsaplings | Attribute_ownerid | Attribute_new_numberoftimesimcool> {
    get(): (Attribute_new_name | Attribute_new_school | Attribute_new_plantedsaplings | Attribute_ownerid | Attribute_new_numberoftimesimcool)[];
    get(index: number): (Attribute_new_name | Attribute_new_school | Attribute_new_plantedsaplings | Attribute_ownerid | Attribute_new_numberoftimesimcool);
    get(name: 'new_name'): Attribute_new_name;
    get(name: 'new_school'): Attribute_new_school;
    get(name: 'new_plantedsaplings'): Attribute_new_plantedsaplings;
    get(name: 'ownerid'): Attribute_ownerid;
    get(name: 'new_numberoftimesimcool'): Attribute_new_numberoftimesimcool;
    get(predicate: (value: Attribute_new_name | Attribute_new_school | Attribute_new_plantedsaplings | Attribute_ownerid | Attribute_new_numberoftimesimcool, index: number) => boolean): (Attribute_new_name | Attribute_new_school | Attribute_new_plantedsaplings | Attribute_ownerid | Attribute_new_numberoftimesimcool)[];
    getLength(): 5;
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

interface Control_new_school {
    getAttribute(): Attribute_new_school;
}

interface Control_new_plantedsaplings {
    getAttribute(): Attribute_new_plantedsaplings;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface Control_new_numberoftimesimcool {
    getAttribute(): Attribute_new_numberoftimesimcool;
}

interface UI_ControlCollection extends Collection<Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool> {
    get(): (Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool)[];
    get(index: number): (Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool);
    get(name: 'new_name'): Control_new_name;
    get(name: 'new_school'): Control_new_school;
    get(name: 'new_plantedsaplings'): Control_new_plantedsaplings;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'new_numberoftimesimcool'): Control_new_numberoftimesimcool;
    get(predicate: (value: Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool, index: number) => boolean): (Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool)[];
    getLength(): 5;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool> {
    get(): [Control_new_name, Control_new_school, Control_new_plantedsaplings, Control_ownerid, Control_new_numberoftimesimcool];
    get(index: number): never;
    get(name: 'new_name'): Control_new_name;
    get(index: number): never;
    get(name: 'new_school'): Control_new_school;
    get(index: number): never;
    get(name: 'new_plantedsaplings'): Control_new_plantedsaplings;
    get(index: number): never;
    get(name: 'ownerid'): Control_ownerid;
    get(index: number): never;
    get(name: 'new_numberoftimesimcool'): Control_new_numberoftimesimcool;
    get(predicate: (value: Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool, index: number) => boolean): (Control_new_name | Control_new_school | Control_new_plantedsaplings | Control_ownerid | Control_new_numberoftimesimcool)[];
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
    getAttribute(name: 'new_name'): Attribute_new_name;
    getAttribute(name: 'new_school'): Attribute_new_school;
    getAttribute(name: 'new_plantedsaplings'): Attribute_new_plantedsaplings;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getAttribute(name: 'new_numberoftimesimcool'): Attribute_new_numberoftimesimcool;
}
