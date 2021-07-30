function OnLoad(formContext, speciesValue) {

    var gridContext = formContext.getControl("Sapling_Subgrid");

    var notifySuccess =
    {
        level: 1,
        message: "New sapling successfully added!",
        type: 2,
        showCloseButton: true
    }

    var notifyFailure =
    {
        level: 2,
        message: "Error adding sapling: Contact your system administrator.",
        type: 2,
        showCloseButton: true
    }

    var saplingFormParam =
    {
        "new_cr35b_texas_student@odata.bind": "/cr35b_texas_students(" + formContext.data.entity.getEntityReference().id.replace("{", "").replace("}","") + ")",
        "new_cr35b_texas_school@odata.bind": "/cr35b_texas_schools(" + formContext.getAttribute('new_school2').getValue()[0].id.replace("{", "").replace("}", "") + ")",
        "new_speciesplanted": speciesValue
    };

    Xrm.WebApi.online.createRecord("cr35b_sapling", saplingFormParam).then(
        function successSapling(result) {
            console.log("Sapling created with ID: " + result.id);
            gridContext.refresh();
            Xrm.App.addGlobalNotification(notifySuccess);            
        },
        function (error) {
            console.log(error.message);
            gridContext.refresh();
            Xrm.App.addGlobalNotification(notifyFailure);
        }
    );
}