import ExecutionContext from './api/executionContext';
import { AlertStrings, ConfirmResponse, ConfirmStrings, ErrorOptions } from './common/dialog';
import { FormOptions, QuickCreateOptions } from './common/entityForm';
import { File, OpenFileOptions } from './common/file';
import Lookup from './common/lookup';
import { DialogNavigationOptions, InlineNavigationOptions } from './common/navigationOptions';
import Notification from './common/notification';
import PageInput, { CreateEntityRecord } from './common/pageInput';
import { SizeOptions } from './common/size';

export {
    ExecutionContext
}

declare global {
    namespace Xrm {
        namespace App {
            /**
             * Displays an error, information, warning, or success notification for an app,
             * and lets you specify actions to execute based on the notification.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-app/addglobalnotification docs.microsoft.com}
             * 
             * @param notification The notification to add.
             * @returns A promise object containing a GUID value to uniquely identify the notification.
             */
            function addGlobalNotification(notification: Notification): Promise<string>;
            /**
             * Clears a notification in the app.
             * 
             * {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-app/clearglobalnotification docs.microsoft.com}
             * 
             * @param uniqueId The ID to use to clear a specific notification that was set using addGlobalNotification.
             * @returns A promise object.
             */
            function clearGlobalNotification(uniqueId: string): Promise<void>;
        }
        namespace Navigation {
            /**
             * Navigates to the specified table list, table record, or HTML web resource.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto docs.microsoft.com}
             * 
             * @param pageInput Input about the page to navigate to.
             * @param navigationOptions Options for navigating to a page: whether to open inline or in a dialog. If you don't specify this parameter, page is opened inline by default.
             * @returns A promise object that resolves when the dialog is closed, returning a Lookup to the created record.
             */
            function navigateTo(pageInput: CreateEntityRecord, navigationOptions: DialogNavigationOptions): Promise<{ savedEntityReference: Lookup[] }>;
            /**
             * Navigates to the specified table list, table record, or HTML web resource.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto docs.microsoft.com}
             * 
             * @param pageInput Input about the page to navigate to.
             * @param navigationOptions Options for navigating to a page: whether to open inline or in a dialog. If you don't specify this parameter, page is opened inline by default.
             * @returns A promise object that resolves when the dialog is closed.
             */
            function navigateTo(pageInput: PageInput, navigationOptions: DialogNavigationOptions): Promise<void>;
            /**
             * Navigates to the specified table list, table record, or HTML web resource.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto docs.microsoft.com}
             * 
             * @param pageInput Input about the page to navigate to.
             * @param navigationOptions Options for navigating to a page: whether to open inline or in a dialog. If you don't specify this parameter, page is opened inline by default.
             * @returns A promise object that resolves immediately.
             */
            function navigateTo(pageInput: PageInput, navigationOptions?: InlineNavigationOptions): Promise<void>;
            /**
             * Displays an alert dialog containing a message and a button.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openalertdialog docs.microsoft.com}
             * 
             * @param alertStrings The strings to be used in the alert dialog.
             * @param alertOptions The height and width options for alert dialog. 
             * @returns A promise object that resolves when the alert dialog is closed by either clicking the confirm button or cancelled by pressing ESC.
             */
            function openAlertDialog(alertStrings: AlertStrings, alertOptions?: SizeOptions): Promise<void>;
            /**
             * Displays a confirmation dialog box containing a message and two buttons.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openconfirmdialog docs.microsoft.com}
             * 
             * @param confirmStrings The strings to be used in the confirmation dialog.
             * @param confirmOptions The height and width options for confirmation dialog.
             * @returns A promise object that resolves when the confirmation dialog is closed by clicking the confirm, cancel, or X in the top-right corner of the dialog.
             */
            function openConfirmDialog(confirmStrings: ConfirmStrings, confirmOptions?: SizeOptions): Promise<ConfirmResponse>;
            /**
             * Displays an error dialog.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openerrordialog docs.microsoft.com}
             * 
             * @param errorOptions An object to specify the options for error dialog.
             * @returns A promise object that resolves when the error dialog is closed.
             */
            function openErrorDialog(errorOptions: ErrorOptions);
            /**
             * Opens a file.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openfile docs.microsoft.com}
             * 
             * @param file An object describing the file to open.
             * @param openFileOptions An object describing whether to open or save the file. This parameter is only supported on Unified Interface.
             */
            function openFile(file: File, openFileOptions?: OpenFileOptions): void;
            /**
             * Opens an entity form or a quick create form.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openform docs.microsoft.com}
             * 
             * @param entityFormOptions Form options for opening the form.
             * @param formParameters A dictionary object that passes extra parameters to the form. Invalid parameters will cause an error.
             */
            function openForm(entityFormOptions: FormOptions, formParameters: { [key: string]: any }): void;
            /**
             * Opens an entity form or a quick create form.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openform docs.microsoft.com}
             * 
             * @param entityFormOptions Form options for opening the form.
             * @param formParameters A dictionary object that passes extra parameters to the form. Invalid parameters will cause an error.
             * @returns A promise object that resolves when the record is saved in the quick create form.
             */
            function openForm(entityFormOptions: QuickCreateOptions, formParameters: { [key: string]: any }): Promise<{ savedEntityReference: Lookup[] }>;
            /**
             * Opens a URL, including file URLs.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openurl docs.microsoft.com}
             * 
             * @param url URL to open.
             * @param openUrlOptions Options to open the URL.
             */
            function openUrl(url: string, openUrlOptions?: SizeOptions): void;
            /**
             * Opens an HTML web resource in a new window.
             * 
             * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openwebresource docs.microsoft.com}
             * 
             * @param webResourceName Name of the HTML web resource to open.
             * @param windowOptions Window options for opening the web resource.
             * @param data Data to be passed into the data parameter.
             */
            function openWebResource(webResourceName: string, windowOptions?: SizeOptions, data?: string): void;
        }
    }
}