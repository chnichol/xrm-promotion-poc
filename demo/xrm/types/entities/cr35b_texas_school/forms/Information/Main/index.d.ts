import { Collection, Control, Entity, FormContext, FormContextData, FormContextUI, Section, Tab } from "xrm-types";
import cr35b_texas_school_name from "../../../attributes/cr35b_texas_school_name";
import new_schoolemail from "../../../attributes/new_schoolemail";
import new_schoolid from "../../../attributes/new_schoolid";
import new_schooladdressstate from "../../../attributes/new_schooladdressstate";
import new_schooladdresscity from "../../../attributes/new_schooladdresscity";
import new_schooladdresszip from "../../../attributes/new_schooladdresszip";
import new_schooladdressstreet from "../../../attributes/new_schooladdressstreet";
import ownerid from "../../../attributes/ownerid";
import new_saplingcount_school from "../../../attributes/new_saplingcount_school";

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

interface Attribute_new_schoolemail_ControlCollection extends Collection<Control_new_schoolemail> {
    get(): (Control_new_schoolemail)[];
    get(predicate: (value: Control_new_schoolemail, index: number) => boolean): (Control_new_schoolemail)[];
    getLength(): 1;
    get(index: number): (Control_new_schoolemail);
    get(name: 'new_schoolemail'): Control_new_schoolemail;
}

interface Attribute_new_schoolemail extends new_schoolemail {
    controls: Attribute_new_schoolemail_ControlCollection;
}

interface Attribute_new_schoolid_ControlCollection extends Collection<Control_new_schoolid> {
    get(): (Control_new_schoolid)[];
    get(predicate: (value: Control_new_schoolid, index: number) => boolean): (Control_new_schoolid)[];
    getLength(): 1;
    get(index: number): (Control_new_schoolid);
    get(name: 'new_schoolid'): Control_new_schoolid;
}

interface Attribute_new_schoolid extends new_schoolid {
    controls: Attribute_new_schoolid_ControlCollection;
}

interface Attribute_new_schooladdressstate_ControlCollection extends Collection<Control_new_schooladdressstate> {
    get(): (Control_new_schooladdressstate)[];
    get(predicate: (value: Control_new_schooladdressstate, index: number) => boolean): (Control_new_schooladdressstate)[];
    getLength(): 1;
    get(index: number): (Control_new_schooladdressstate);
    get(name: 'new_schooladdressstate'): Control_new_schooladdressstate;
}

interface Attribute_new_schooladdressstate extends new_schooladdressstate {
    controls: Attribute_new_schooladdressstate_ControlCollection;
}

interface Attribute_new_schooladdresscity_ControlCollection extends Collection<Control_new_schooladdresscity> {
    get(): (Control_new_schooladdresscity)[];
    get(predicate: (value: Control_new_schooladdresscity, index: number) => boolean): (Control_new_schooladdresscity)[];
    getLength(): 1;
    get(index: number): (Control_new_schooladdresscity);
    get(name: 'new_schooladdresscity'): Control_new_schooladdresscity;
}

interface Attribute_new_schooladdresscity extends new_schooladdresscity {
    controls: Attribute_new_schooladdresscity_ControlCollection;
}

interface Attribute_new_schooladdresszip_ControlCollection extends Collection<Control_new_schooladdresszip> {
    get(): (Control_new_schooladdresszip)[];
    get(predicate: (value: Control_new_schooladdresszip, index: number) => boolean): (Control_new_schooladdresszip)[];
    getLength(): 1;
    get(index: number): (Control_new_schooladdresszip);
    get(name: 'new_schooladdresszip'): Control_new_schooladdresszip;
}

interface Attribute_new_schooladdresszip extends new_schooladdresszip {
    controls: Attribute_new_schooladdresszip_ControlCollection;
}

interface Attribute_new_schooladdressstreet_ControlCollection extends Collection<Control_new_schooladdressstreet> {
    get(): (Control_new_schooladdressstreet)[];
    get(predicate: (value: Control_new_schooladdressstreet, index: number) => boolean): (Control_new_schooladdressstreet)[];
    getLength(): 1;
    get(index: number): (Control_new_schooladdressstreet);
    get(name: 'new_schooladdressstreet'): Control_new_schooladdressstreet;
}

interface Attribute_new_schooladdressstreet extends new_schooladdressstreet {
    controls: Attribute_new_schooladdressstreet_ControlCollection;
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

interface Attribute_new_saplingcount_school_ControlCollection extends Collection<Control_new_saplingcount_school> {
    get(): (Control_new_saplingcount_school)[];
    get(predicate: (value: Control_new_saplingcount_school, index: number) => boolean): (Control_new_saplingcount_school)[];
    getLength(): 1;
    get(index: number): (Control_new_saplingcount_school);
    get(name: 'new_saplingcount_school'): Control_new_saplingcount_school;
}

interface Attribute_new_saplingcount_school extends new_saplingcount_school {
    controls: Attribute_new_saplingcount_school_ControlCollection;
}

interface Entity_AttributeCollection extends Collection<Attribute_cr35b_texas_school_name | Attribute_new_schoolemail | Attribute_new_schoolid | Attribute_new_schooladdressstate | Attribute_new_schooladdresscity | Attribute_new_schooladdresszip | Attribute_new_schooladdressstreet | Attribute_ownerid | Attribute_new_saplingcount_school> {
    get(): (Attribute_cr35b_texas_school_name | Attribute_new_schoolemail | Attribute_new_schoolid | Attribute_new_schooladdressstate | Attribute_new_schooladdresscity | Attribute_new_schooladdresszip | Attribute_new_schooladdressstreet | Attribute_ownerid | Attribute_new_saplingcount_school)[];
    get(index: number): (Attribute_cr35b_texas_school_name | Attribute_new_schoolemail | Attribute_new_schoolid | Attribute_new_schooladdressstate | Attribute_new_schooladdresscity | Attribute_new_schooladdresszip | Attribute_new_schooladdressstreet | Attribute_ownerid | Attribute_new_saplingcount_school);
    get(predicate: (value: Attribute_cr35b_texas_school_name | Attribute_new_schoolemail | Attribute_new_schoolid | Attribute_new_schooladdressstate | Attribute_new_schooladdresscity | Attribute_new_schooladdresszip | Attribute_new_schooladdressstreet | Attribute_ownerid | Attribute_new_saplingcount_school, index: number) => boolean): (Attribute_cr35b_texas_school_name | Attribute_new_schoolemail | Attribute_new_schoolid | Attribute_new_schooladdressstate | Attribute_new_schooladdresscity | Attribute_new_schooladdresszip | Attribute_new_schooladdressstreet | Attribute_ownerid | Attribute_new_saplingcount_school)[];
    getLength(): 9;
    get(name: 'cr35b_texas_school_name'): Attribute_cr35b_texas_school_name;
    get(name: 'new_schoolemail'): Attribute_new_schoolemail;
    get(name: 'new_schoolid'): Attribute_new_schoolid;
    get(name: 'new_schooladdressstate'): Attribute_new_schooladdressstate;
    get(name: 'new_schooladdresscity'): Attribute_new_schooladdresscity;
    get(name: 'new_schooladdresszip'): Attribute_new_schooladdresszip;
    get(name: 'new_schooladdressstreet'): Attribute_new_schooladdressstreet;
    get(name: 'ownerid'): Attribute_ownerid;
    get(name: 'new_saplingcount_school'): Attribute_new_saplingcount_school;
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

interface Control_new_schoolemail extends Control {
    getAttribute(): Attribute_new_schoolemail;
}

interface Control_new_schoolid extends Control {
    getAttribute(): Attribute_new_schoolid;
}

interface Control_new_schooladdressstate extends Control {
    getAttribute(): Attribute_new_schooladdressstate;
}

interface Control_new_schooladdresscity extends Control {
    getAttribute(): Attribute_new_schooladdresscity;
}

interface Control_new_schooladdresszip extends Control {
    getAttribute(): Attribute_new_schooladdresszip;
}

interface Control_new_schooladdressstreet extends Control {
    getAttribute(): Attribute_new_schooladdressstreet;
}

interface Control_ownerid extends Control {
    getAttribute(): Attribute_ownerid;
}

interface Control_new_saplingcount_school extends Control {
    getAttribute(): Attribute_new_saplingcount_school;
}

interface Control_Student_Subgrid extends Control {
    getAttribute(): undefined;
}

interface UI_ControlCollection extends Collection<Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school | Control_Student_Subgrid> {
    get(): (Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school | Control_Student_Subgrid)[];
    get(index: number): (Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school | Control_Student_Subgrid);
    get(predicate: (value: Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school | Control_Student_Subgrid, index: number) => boolean): (Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school | Control_Student_Subgrid)[];
    getLength(): 10;
    get(name: 'cr35b_texas_school_name'): Control_cr35b_texas_school_name;
    get(name: 'new_schoolemail'): Control_new_schoolemail;
    get(name: 'new_schoolid'): Control_new_schoolid;
    get(name: 'new_schooladdressstate'): Control_new_schooladdressstate;
    get(name: 'new_schooladdresscity'): Control_new_schooladdresscity;
    get(name: 'new_schooladdresszip'): Control_new_schooladdresszip;
    get(name: 'new_schooladdressstreet'): Control_new_schooladdressstreet;
    get(name: 'ownerid'): Control_ownerid;
    get(name: 'new_saplingcount_school'): Control_new_saplingcount_school;
    get(name: 'Student_Subgrid'): Control_Student_Subgrid;
}

interface UI_Tab0_Section0_ControlCollection extends Collection<Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school> {
    get(): [Control_cr35b_texas_school_name, Control_new_schoolemail, Control_new_schoolid, Control_new_schooladdressstate, Control_new_schooladdresscity, Control_new_schooladdresszip, Control_new_schooladdressstreet, Control_ownerid, Control_new_saplingcount_school];
    get(predicate: (value: Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school, index: number) => boolean): (Control_cr35b_texas_school_name | Control_new_schoolemail | Control_new_schoolid | Control_new_schooladdressstate | Control_new_schooladdresscity | Control_new_schooladdresszip | Control_new_schooladdressstreet | Control_ownerid | Control_new_saplingcount_school)[];
    getLength(): 9;
    get(index: number): never;
    get(name: string): never;
}

interface UI_Tab0_Section0 extends Section {
    controls: UI_Tab0_Section0_ControlCollection;
    getName(): 'undefined';
}

interface UI_Tab0_Section1_ControlCollection extends Collection<Control_Student_Subgrid> {
    get(): [Control_Student_Subgrid];
    get(predicate: (value: Control_Student_Subgrid, index: number) => boolean): (Control_Student_Subgrid)[];
    getLength(): 1;
    get(index: number): never;
    get(name: string): never;
}

interface UI_Tab0_Section1 extends Section {
    controls: UI_Tab0_Section1_ControlCollection;
    getName(): 'school_details_student_section_3';
}

interface UI_Tab0_SectionCollection extends Collection<UI_Tab0_Section0 | UI_Tab0_Section1> {
    get(): [UI_Tab0_Section0, UI_Tab0_Section1];
    get(predicate): (UI_Tab0_Section0 | UI_Tab0_Section1)[];
    getLength(): 2;
    get(index: 0): UI_Tab0_Section0;
    get(name: 'undefined'): UI_Tab0_Section0;
    get(index: 1): UI_Tab0_Section1;
    get(name: 'school_details_student_section_3'): UI_Tab0_Section1;
}

interface UI_Tab0 extends Tab {
    sections: UI_Tab0_SectionCollection;
    getName(): 'school_details_tab';
}

interface UI_TabCollection extends Collection<UI_Tab0> {
    get(): [UI_Tab0];
    get(predicate: (value: UI_Tab0, index: number) => boolean): (UI_Tab0)[];
    get(index: 0): UI_Tab0;
    get(name: 'school_details_tab'): UI_Tab0;
}

interface UI extends FormContextUI {
    controls: UI_ControlCollection;
    tabs: UI_TabCollection;
}

export default interface GeneratedFormContext extends FormContext {
    data: Data;
    ui: UI;
    getAttribute(name: 'cr35b_texas_school_name'): Attribute_cr35b_texas_school_name;
    getAttribute(name: 'new_schoolemail'): Attribute_new_schoolemail;
    getAttribute(name: 'new_schoolid'): Attribute_new_schoolid;
    getAttribute(name: 'new_schooladdressstate'): Attribute_new_schooladdressstate;
    getAttribute(name: 'new_schooladdresscity'): Attribute_new_schooladdresscity;
    getAttribute(name: 'new_schooladdresszip'): Attribute_new_schooladdresszip;
    getAttribute(name: 'new_schooladdressstreet'): Attribute_new_schooladdressstreet;
    getAttribute(name: 'ownerid'): Attribute_ownerid;
    getAttribute(name: 'new_saplingcount_school'): Attribute_new_saplingcount_school;
    getControl(name: 'cr35b_texas_school_name'): Control_cr35b_texas_school_name;
    getControl(name: 'new_schoolemail'): Control_new_schoolemail;
    getControl(name: 'new_schoolid'): Control_new_schoolid;
    getControl(name: 'new_schooladdressstate'): Control_new_schooladdressstate;
    getControl(name: 'new_schooladdresscity'): Control_new_schooladdresscity;
    getControl(name: 'new_schooladdresszip'): Control_new_schooladdresszip;
    getControl(name: 'new_schooladdressstreet'): Control_new_schooladdressstreet;
    getControl(name: 'ownerid'): Control_ownerid;
    getControl(name: 'new_saplingcount_school'): Control_new_saplingcount_school;
    getControl(name: 'Student_Subgrid'): Control_Student_Subgrid;
}
