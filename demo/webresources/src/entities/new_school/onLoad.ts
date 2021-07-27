import { ExecutionContext } from 'xrm-api';
import FormContext from 'xrm-generated/entities/new_school/forms/Information/Main';

export default function onLoad(executionContext: ExecutionContext<FormContext>) {
    const ui = executionContext.getFormContext().ui;
    const generalTab = ui.tabs.get('tab_general');
    const createSection = generalTab.sections.get('section_general_create');
    const updateSection = generalTab.sections.get('section_general_update');
    const relatedSection = generalTab.sections.get('section_related');
    switch (ui.getFormType()) {
        // Create.
        case 1:
            createSection.setVisible(true);
            updateSection.setVisible(false);
            relatedSection.setVisible(false);
            break;
        // Update.
        case 2:
            createSection.setVisible(false);
            updateSection.setVisible(true);
            relatedSection.setVisible(true);
            break;
    }
}