var new_clientSideSample=function(e){"use strict";var t={onLoad:function(e){var t=e.getFormContext().ui,i=t.tabs.get("tab_general"),n=i.sections.get("section_general_create"),s=i.sections.get("section_general_update"),a=i.sections.get("section_related");switch(t.getFormType()){case 1:n.setVisible(!0),s.setVisible(!1),a.setVisible(!1);break;case 2:n.setVisible(!1),s.setVisible(!0),a.setVisible(!0)}}},i={createSapling:function(e){var t={new_student:e.data.entity.getEntityReference(),new_school:e.getAttribute("new_school").getValue()};Xrm.Navigation.openForm({entityName:"new_sapling"},t)}};return e.schoolForm=t,e.studentForm=i,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
