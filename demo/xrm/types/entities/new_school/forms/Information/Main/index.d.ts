import { Collection, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from 'xrm-types';
import new_name from '../../../attributes/new_name/index';
import ownerid from '../../../attributes/ownerid/index';
import new_id from '../../../attributes/new_id/index';
import new_plantedsaplings from '../../../attributes/new_plantedsaplings/index';
import new_email from '../../../attributes/new_email/index';
import new_addressstreet from '../../../attributes/new_addressstreet/index';
import new_addresstimezone from '../../../attributes/new_addresstimezone/index';
import new_addresscity from '../../../attributes/new_addresscity/index';
import new_addressstate from '../../../attributes/new_addressstate/index';
import new_addresszip from '../../../attributes/new_addresszip/index';

interface Attribute_new_name_ControlCollection extends Collection<Control_new_name | Control_new_name> {
    get(): (Control_new_name | Control_new_name)[];
    get(index: number): (Control_new_name | Control_new_name);
    get(name: 'new_name'): Control_new_name;
    get(index: number): (Control_new_name | Control_new_name);
    get(name: 'new_name'): Control_new_name;
    get(predicate: (value: Control_new_name | Control_new_name, index: number) => boolean): (Control_new_name | Control_new_name)[];
    getLength(): 2;
}

interface Attribute_new_name extends new_name {
    controls: Attribute_new_name_ControlCollection;
}

interface Attribute_ownerid_ControlCollection extends Collection<Control_ownerid | Control_ownerid> {
    get(): (Control_ownerid | Control_ownerid)[];
    get(index: number): (Control_ownerid | Control_ownerid);
    get(name: 'ownerid'): Control_ownerid;
    get(index: number): (Control_ownerid | Control_ownerid);
    get(name: 'ownerid'): Control_ownerid;
    get(predicate: (value: Control_ownerid | Control_ownerid, index: number) => boolean): (Control_ownerid | Control_ownerid)[];
    getLength(): 2;
}

interface Attribute_ownerid extends ownerid {
    controls: Attribute_ownerid_ControlCollection;
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

interface Attribute_new_email_ControlCollection extends Collection<Control_new_email> {
    get(): (Control_new_email)[];
    get(index: number): (Control_new_email);
    get(name: 'new_email'): Control_new_email;
    get(predicate: (value: Control_new_email, index: number) => boolean): (Control_new_email)[];
    getLength(): 1;
}

interface Attribute_new_email extends new_email {
    controls: Attribute_new_email_ControlCollection;
}

interface Attribute_new_addressstreet_ControlCollection extends Collection<Control_new_addressstreet> {
    get(): (Control_new_addressstreet)[];
    get(index: number): (Control_new_addressstreet);
    get(name: 'new_addressstreet'): Control_new_addressstreet;
    get(predicate: (value: Control_new_addressstreet, index: number) => boolean): (Control_new_addressstreet)[];
    getLength(): 1;
}

interface Attribute_new_addressstreet extends new_addressstreet {
    controls: Attribute_new_addressstreet_ControlCollection;
}

interface Attribute_new_addresstimezone_ControlCollection extends Collection<Control_new_addresstimezone> {
    get(): (Control_new_addresstimezone)[];
    get(index: number): (Control_new_addresstimezone);
    get(name: 'new_addresstimezone'): Control_new_addresstimezone;
    get(predicate: (value: Control_new_addresstimezone, index: number) => boolean): (Control_new_addresstimezone)[];
    getLength(): 1;
}

interface Attribute_new_addresstimezone extends new_addresstimezone {
    controls: Attribute_new_addresstimezone_ControlCollection;
}

interface Attribute_new_addresscity_ControlCollection extends Collection<Control_new_addresscity> {
    get(): (Control_new_addresscity)[];
    get(index: number): (Control_new_addresscity);
    get(name: 'new_addresscity'): Control_new_addresscity;
    get(predicate: (value: Control_new_addresscity, index: number) => boolean): (Control_new_addresscity)[];
    getLength(): 1;
}

interface Attribute_new_addresscity extends new_addresscity {
    controls: Attribute_new_addresscity_ControlCollection;
}

interface Attribute_new_addressstate_ControlCollection extends Collection<Control_new_addressstate> {
    get(): (Control_new_addressstate)[];
    get(index: number): (Control_new_addressstate);
    get(name: 'new_addressstate'): Control_new_addressstate;
    get(predicate: (value: Control_new_addressstate, index: number) => boolean): (Control_new_addressstate)[];
    getLength(): 1;
}

interface Attribute_new_addressstate extends new_addressstate {
    controls: Attribute_new_addressstate_ControlCollection;
}

interface Attribute_new_addresszip_ControlCollection extends Collection<Control_new_addresszip> {
    get(): (Control_new_addresszip)[];
    get(index: number): (Control_new_addresszip);
    get(name: 'new_addresszip'): Control_new_addresszip;
    get(predicate: (value: Control_new_addresszip, index: number) => boolean): (Control_new_addresszip)[];
    getLength(): 1;
}

interface Attribute_new_addresszip extends new_addresszip {
    controls: Attribute_new_addresszip_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_new_name | Attribute_ownerid | Attribute_new_id | Attribute_new_plantedsaplings | Attribute_new_email | Attribute_new_addressstreet | Attribute_new_addresstimezone | Attribute_new_addresscity | Attribute_new_addressstate | Attribute_new_addresszip> {
    get(): (Attribute_new_name | Attribute_ownerid | Attribute_new_id | Attribute_new_plantedsaplings | Attribute_new_email | Attribute_new_addressstreet | Attribute_new_addresstimezone | Attribute_new_addresscity | Attribute_new_addressstate | Attribute_new_addresszip)[];
    get(index: number): (Attribute_new_name | Attribute_ownerid | Attribute_new_id | Attribute_new_plantedsaplings | Attribute_new_email | Attribute_new_addressstreet | Attribute_new_addresstimezone | Attribute_new_addresscity | Attribute_new_addressstate | Attribute_new_addresszip);
    get(name: 'new_name'): Attribute_new_name;
    get(name: 'ownerid'): Attribute_ownerid;
    get(name: 'new_id'): Attribute_new_id;
    get(name: 'new_plantedsaplings'): Attribute_new_plantedsaplings;
    get(name: 'new_email'): Attribute_new_email;
    get(name: 'new_addressstreet'): Attribute_new_addressstreet;
    get(name: 'new_addresstimezone'): Attribute_new_addresstimezone;
    get(name: 'new_addresscity'): Attribute_new_addresscity;
    get(name: 'new_addressstate'): Attribute_new_addressstate;
    get(name: 'new_addresszip'): Attribute_new_addresszip;
    get(predicate: (value: Attribute_new_name | Attribute_ownerid | Attribute_new_id | Attribute_new_plantedsaplings | Attribute_new_email | Attribute_new_addressstreet | Attribute_new_addresstimezone | Attribute_new_addresscity | Attribute_new_addressstate | Attribute_new_addresszip, index: number) => boolean): (Attribute_new_name | Attribute_ownerid | Attribute_new_id | Attribute_new_plantedsaplings | Attribute_new_email | Attribute_new_addressstreet | Attribute_new_addresstimezone | Attribute_new_addresscity | Attribute_new_addressstate | Attribute_new_addresszip)[];
    getLength(): 10;
}

interface DataEntity extends Entity<'new_school'> {
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

interface Control_new_name {
    getAttribute(): Attribute_new_name;
}

interface Control_new_id {
    getAttribute(): Attribute_new_id;
}

interface Control_ownerid {
    getAttribute(): Attribute_ownerid;
}

interface Control_new_plantedsaplings {
    getAttribute(): Attribute_new_plantedsaplings;
}

interface Control_new_email {
    getAttribute(): Attribute_new_email;
}

interface Control_new_addressstreet {
    getAttribute(): Attribute_new_addressstreet;
}

interface Control_new_addresstimezone {
    getAttribute(): Attribute_new_addresstimezone;
}

interface Control_new_addresscity {
    getAttribute(): Attribute_new_addresscity;
}

interface Control_new_addressstate {
    getAttribute(): Attribute_new_addressstate;
}

interface Control_new_addresszip {
    getAttribute(): Attribute_new_addresszip;
}

interface Control_subgrid_students {
    getAttribute(): undefined;
}

interface UI_ControlCollection extends Collection<Control_new_name | Control_ownerid | Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings | Control_new_email | Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip | Control_subgrid_students> {
    get(): (Control_new_name | Control_ownerid | Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings | Control_new_email | Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip | Control_subgrid_students)[];
    get(index: number): (Control_new_name | Control_ownerid | Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings | Control_new_email | Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip | Control_subgrid_students);
    get(name: 'new_name'): Control_new_name;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'new_name'): Control_new_name;
    get(name: 'new_id'): Control_new_id;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'new_plantedsaplings'): Control_new_plantedsaplings;
    get(name: 'new_email'): Control_new_email;
    get(name: 'new_addressstreet'): Control_new_addressstreet;
    get(name: 'new_addresstimezone'): Control_new_addresstimezone;
    get(name: 'new_addresscity'): Control_new_addresscity;
    get(name: 'new_addressstate'): Control_new_addressstate;
    get(name: 'new_addresszip'): Control_new_addresszip;
    get(name: 'subgrid_students'): Control_subgrid_students;
    get(predicate: (value: Control_new_name | Control_ownerid | Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings | Control_new_email | Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip | Control_subgrid_students, index: number) => boolean): (Control_new_name | Control_ownerid | Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings | Control_new_email | Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip | Control_subgrid_students)[];
    getLength(): 13;
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
    getName(): 'section_general_create';
}

interface UI_Tab0_Section1_ControlCollection extends Collection<Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings> {
    get(): [Control_new_name, Control_new_id, Control_ownerid, Control_new_plantedsaplings];
    get(index: number): never;
    get(name: 'new_name'): Control_new_name;
    get(index: number): never;
    get(name: 'new_id'): Control_new_id;
    get(index: number): never;
    get(name: 'ownerid'): Control_ownerid;
    get(index: number): never;
    get(name: 'new_plantedsaplings'): Control_new_plantedsaplings;
    get(predicate: (value: Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings, index: number) => boolean): (Control_new_name | Control_new_id | Control_ownerid | Control_new_plantedsaplings)[];
    getLength(): 4;
}

interface UI_Tab0_Section1 extends Section {
    controls: UI_Tab0_Section1_ControlCollection;
    getName(): 'section_general_update';
}

interface UI_Tab0_Section2_ControlCollection extends Collection<Control_new_email> {
    get(): [Control_new_email];
    get(index: number): never;
    get(name: 'new_email'): Control_new_email;
    get(predicate: (value: Control_new_email, index: number) => boolean): (Control_new_email)[];
    getLength(): 1;
}

interface UI_Tab0_Section2 extends Section {
    controls: UI_Tab0_Section2_ControlCollection;
    getName(): 'section_contact';
}

interface UI_Tab0_Section3_ControlCollection extends Collection<Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip> {
    get(): [Control_new_addressstreet, Control_new_addresstimezone, Control_new_addresscity, Control_new_addressstate, Control_new_addresszip];
    get(index: number): never;
    get(name: 'new_addressstreet'): Control_new_addressstreet;
    get(index: number): never;
    get(name: 'new_addresstimezone'): Control_new_addresstimezone;
    get(index: number): never;
    get(name: 'new_addresscity'): Control_new_addresscity;
    get(index: number): never;
    get(name: 'new_addressstate'): Control_new_addressstate;
    get(index: number): never;
    get(name: 'new_addresszip'): Control_new_addresszip;
    get(predicate: (value: Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip, index: number) => boolean): (Control_new_addressstreet | Control_new_addresstimezone | Control_new_addresscity | Control_new_addressstate | Control_new_addresszip)[];
    getLength(): 5;
}

interface UI_Tab0_Section3 extends Section {
    controls: UI_Tab0_Section3_ControlCollection;
    getName(): 'section_address';
}

interface UI_Tab0_Section4_ControlCollection extends Collection<Control_subgrid_students> {
    get(): [Control_subgrid_students];
    get(index: number): never;
    get(name: 'subgrid_students'): Control_subgrid_students;
    get(predicate: (value: Control_subgrid_students, index: number) => boolean): (Control_subgrid_students)[];
    getLength(): 1;
}

interface UI_Tab0_Section4 extends Section {
    controls: UI_Tab0_Section4_ControlCollection;
    getName(): 'section_related';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3 | UI_Tab0_Section4> {
    get(): [UI_Tab0_Section0, UI_Tab0_Section1, UI_Tab0_Section2, UI_Tab0_Section3, UI_Tab0_Section4];
    get(index: 0): UI_Tab0_Section0;
    get(name: 'section_general_create'): UI_Tab0_Section0;
    get(index: 1): UI_Tab0_Section1;
    get(name: 'section_general_update'): UI_Tab0_Section1;
    get(index: 2): UI_Tab0_Section2;
    get(name: 'section_contact'): UI_Tab0_Section2;
    get(index: 3): UI_Tab0_Section3;
    get(name: 'section_address'): UI_Tab0_Section3;
    get(index: 4): UI_Tab0_Section4;
    get(name: 'section_related'): UI_Tab0_Section4;
    get(predicate: (value: UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3 | UI_Tab0_Section4, index: number) => boolean): (UI_Tab0_Section0 | UI_Tab0_Section1 | UI_Tab0_Section2 | UI_Tab0_Section3 | UI_Tab0_Section4)[];
    getLength(): 5;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): 'tab_general';
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(index: 0): UI_Tab0;
    get(name: 'tab_general'): UI_Tab0;
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
    getAttribute(name: 'new_id'): Attribute_new_id;
    getAttribute(name: 'new_plantedsaplings'): Attribute_new_plantedsaplings;
    getAttribute(name: 'new_email'): Attribute_new_email;
    getAttribute(name: 'new_addressstreet'): Attribute_new_addressstreet;
    getAttribute(name: 'new_addresstimezone'): Attribute_new_addresstimezone;
    getAttribute(name: 'new_addresscity'): Attribute_new_addresscity;
    getAttribute(name: 'new_addressstate'): Attribute_new_addressstate;
    getAttribute(name: 'new_addresszip'): Attribute_new_addresszip;
}
