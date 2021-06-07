import { EventArgs } from './api/events/onDataLoad';
Xrm.Navigation.navigateTo({
    pageType: 'entityrecord',
    entityName: 'account',
}, {
    target: 2,
    height: 100,
    position: 1,
    title: '',
    width: 20
}).then(result => {

});

Xrm.Navigation.navigateTo({
    pageType: 'entityrecord',
    entityName: 'account',
    entityId: '1234-5678'
}, {
    target: 2,
    height: 100,
    position: 1,
    title: '',
    width: 20
}).then(() => {
    
})

Xrm.Navigation.navigateTo({
    pageType: 'entityrecord',
    entityName: ''
}).then(() => {

});