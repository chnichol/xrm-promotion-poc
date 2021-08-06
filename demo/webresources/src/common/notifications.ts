import Notification from 'xrm-types/common/notification';

export const notify = (notification: Notification) => Xrm.App.addGlobalNotification(notification);

export const notifySuccess = (message: string) => notify({
    level: 1,
    message,
    type: 2,
    showCloseButton: true
});

export const notifyFailure = (message: string) => notify({
    level: 2,
    message,
    type: 2,
    showCloseButton: true
});