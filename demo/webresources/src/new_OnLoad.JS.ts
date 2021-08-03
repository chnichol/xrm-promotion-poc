import FormContext from 'xrm-generated/entities/cr35b_texas_student/forms/Information/Main';
import Notification  from 'xrm-types/common/notification';

export function OnLoad(formContext: FormContext, speciesValue: number) {
    const gridContext = formContext.getControl("Sapling_Subgrid");

    const notifySuccess: Notification = {
        level: 1,
        message: "New sapling successfully added!",
        type: 2,
        showCloseButton: true
    }

    const notifyFailure: Notification = {
        level: 2,
        message: "Error adding sapling: Contact your system administrator.",
        type: 2,
        showCloseButton: true
    }

    const saplingFormParam = {
        "new_cr35b_texas_student@odata.bind": "/cr35b_texas_students(" + formContext.data.entity.getEntityReference().id.replace("{", "").replace("}","") + ")",
        "new_cr35b_texas_school@odata.bind": "/cr35b_texas_schools(" + formContext.getAttribute('new_school2').getValue()[0].id.replace("{", "").replace("}", "") + ")",
        "new_speciesplanted": speciesValue
    };

    Xrm.WebApi.createRecord("cr35b_sapling", saplingFormParam).then(
        function successSapling(result: any) {
            gridContext.refresh();
            Xrm.App.addGlobalNotification(notifySuccess);            
        },
        function (error: any) {
            gridContext.refresh();
            Xrm.App.addGlobalNotification(notifyFailure);
        }
    );
}
