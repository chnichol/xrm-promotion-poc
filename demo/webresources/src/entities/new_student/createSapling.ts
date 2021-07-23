import FormContext from 'xrm-generated/entities/new_student/forms/Information/Main';

export default function createSapling(primaryControl: FormContext) {
    const saplingForm = {
        entityName: 'new_sapling'
    };
    const saplingFormParameters = {
        new_student: primaryControl.data.entity.getEntityReference(),
        new_school: primaryControl.getAttribute('new_school').getValue()
    };
    Xrm.Navigation.openForm(saplingForm, saplingFormParameters);
}