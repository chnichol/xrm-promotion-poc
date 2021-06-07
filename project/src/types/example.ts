import { FormContext } from './formContext';
import { ProjectFormContext } from './projectFormContext';
import { OptionSet } from './optionSet';

function foo(formContext: ProjectFormContext) {
    const contact = formContext.getAttribute('contact').getValue();
    const somethingElse = (formContext as FormContext).getAttribute('something') as string;

    const option = OptionSet.ValueB
}