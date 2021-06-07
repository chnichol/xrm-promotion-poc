import Lookup from './lookup';
import Relationship from './relationship';

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
type PageInput = Dashboard | EntityList | CreateEntityRecord | EditEntityRecord | HTMLWebResource;
export default PageInput;

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
 export interface Dashboard {
    pageType: 'dashboard';
    /** The ID of the dashboard to load. If you don't specify the ID, navigates to the default dashboard. */
    dashboardId: string;
}

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export interface EntityList {
    pageType: 'entitylist';
    /** The logical name of the table to load in the list control. */
    entityName: string;
    /**
     * The ID of the view to load. If you don't specify it,
     * navigates to the default main view for the table.
     */
    viewId?: string;
    /** Type of view to load. */
    viewType?: 'savedquery' | 'userquery';
}

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
 export interface CreateEntityRecord {
    pageType: 'entityrecord';
    /** Logical name of the table to display the form for. */
    entityName: string;
    /**
     * ID of the table record to display the form for.
     * If you don't specify this value, the form will be opened in create mode.
     */
    entityId?: '';
    /** Designates a record that will provide default values based on mapped column values. */
    createFromEntity?: Lookup;
    /**
     * A dictionary object that passes extra parameters to the form.
     * Invalid parameters will cause an error.
     * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/set-field-values-using-parameters-passed-form
     * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/configure-form-accept-custom-querystring-parameters
     */
    data?: { [key: string]: any; };
    /** ID of the form instance to be displayed. */
    formId?: string;
    /**
     * Indicates whether the form is navigated to from a
     * different table using cross-table business process flow.
     */
    isCrossEntityNavigate?: boolean;
    /** Indicates whether there are any offline sync errors. */
    isOfflineSyncError?: boolean;
    /** ID of the business process to be displayed on the form. */
    processId?: string;
    /** ID of the business process instance to be displayed on the form. */
    processInstanceId?: string;
    /** Define a relationship object to display the related records on the form. */
    relationship?: Relationship;
    /** ID of the selected stage in business process instance. */
    selectedStageId?: string;
}

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export interface EditEntityRecord {
    pageType: 'entityrecord';
    /** Logical name of the table to display the form for. */
    entityName: string;
    /**
     * ID of the table record to display the form for.
     * If you don't specify this value, the form will be opened in create mode.
     */
    entityId: string;
    /** Designates a record that will provide default values based on mapped column values. */
    createFromEntity?: Lookup;
    /**
     * A dictionary object that passes extra parameters to the form.
     * Invalid parameters will cause an error.
     * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/set-field-values-using-parameters-passed-form
     * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/configure-form-accept-custom-querystring-parameters
     */
    data?: { [key: string]: any; };
    /** ID of the form instance to be displayed. */
    formId?: string;
    /**
     * Indicates whether the form is navigated to from a
     * different table using cross-table business process flow.
     */
    isCrossEntityNavigate?: boolean;
    /** Indicates whether there are any offline sync errors. */
    isOfflineSyncError?: boolean;
    /** ID of the business process to be displayed on the form. */
    processId?: string;
    /** ID of the business process instance to be displayed on the form. */
    processInstanceId?: string;
    /** Define a relationship object to display the related records on the form. */
    relationship?: Relationship;
    /** ID of the selected stage in business process instance. */
    selectedStageId?: string;
}

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export interface HTMLWebResource {
    pageType: 'webresource';
    /** The name of the web resource to load. */
    webresourceName: string;
    /** The data to pass to the web resource. */
    data?: string;
}