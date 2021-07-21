import FormContextData, { Entity } from './data';
export {
    FormContextData,
    Entity
}

import FormContextUI, { FooterSection, FormType, HeaderSection, Section, Tab } from './ui';
export {
    FormContextUI,
    FooterSection,
    FormType,
    HeaderSection,
    Section,
    Tab
}

export default interface FormContext {
    data: FormContextData,
    ui: FormContextUI
}