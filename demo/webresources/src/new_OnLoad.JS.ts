import FormContext from 'xrm-generated/entities/cr35b_texas_student/systemforms/Information/Main';
import { notifyFailure, notifySuccess } from './common/notifications';

export function OnLoad(formContext: FormContext, speciesValue: number) {
    const gridContext = formContext.getControl('Sapling_Subgrid');

    const saplingFormParam = {
        'new_cr35b_texas_student@odata.bind': '/cr35b_texas_students(' + formContext.data.entity.getEntityReference().id.replace('{', '').replace('}','') + ')',
        'new_cr35b_texas_school@odata.bind': '/cr35b_texas_schools(' + formContext.getAttribute('new_school2').getValue()[0].id.replace('{', '').replace('}', '') + ')',
        'new_speciesplanted': speciesValue
    };

    Xrm.WebApi.createRecord('cr35b_sapling', saplingFormParam).then(
        () => {
            gridContext.refresh();
            notifySuccess('New sapling successfully added!');            
        },
        () => {
            gridContext.refresh();
            notifyFailure('Error adding sapling: Contact your system administrator.');
        }
    );
}
