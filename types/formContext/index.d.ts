import FormContextData, { Entity } from './data';
import FormContextUI, { FooterSection, FormType, HeaderSection, Section, Tab } from './ui';

export {
    FormContextData,
    Entity,
    FormContextUI,
    FooterSection,
    FormType,
    HeaderSection,
    Section,
    Tab
}

export default interface FormContext {
    data: FormContextData;
    ui: FormContextUI;
}