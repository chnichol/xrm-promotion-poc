import { Contact } from './contact';
import { FormContext } from './formContext';

export interface ProjectFormContext extends FormContext {
    getAttribute(name: 'contact'): {
        getValue(): Contact;
    };
    getAttribute(name: 'firstName'): {
        getValue(): string;
    };
}