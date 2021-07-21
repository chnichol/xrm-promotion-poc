import { Component, ComponentState } from '..';
import BooleanManagedProperty from '../complex/BooleanManagedProperty';
import AsyncOperation from './AsyncOperation';
import BulkDeleteFailure from './BulkDeleteFailure';
import Organization from './Organization';
import ProcessTrigger from './ProcessTrigger';

type SystemForm = Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties>;
export default SystemForm;

export enum FormPresentation {
    ClassicForm = 0,
    AirForm = 1,
    ConvertedICForm = 2
}

export enum FormState {
    Inactive = 0,
    Active = 1
}

export enum FormType {
    Dashboard = 0,
    AppointmentBook = 1,
    Main = 2,
    MiniCampaignBO = 3,
    Preview = 4,
    MobileExpress = 5,
    QuickViewForm = 6,
    QuickCreate = 7,
    Dialog = 8,
    TaskFlowForm = 9,
    InteractionCentricDashboard = 10,
    Card = 11,
    MainInteractiveExperience = 12,
    ContextualDashboard = 13,
    Other = 100,
    MainBackup = 101,
    AppointmentBookBackup = 102,
    PowerBIDashboard = 103
}

export type Properties = {
    /**
     * Information that specifies whether this component can be deleted.
     * @display Can Be Deleted
     */
    canbedeleted: BooleanManagedProperty<'canbedeleted'>;
    /**
     * For internal use only.
     * @display Component State
     * @readonly
     */
    readonly componentstate: ComponentState;
    /**
     * Description of the form or dashboard.
     * @display Description
     */
    description: string;
    /**
     * Specifies the state of the form.
     * @display Form State
     */
    formactivationstate: FormState;
    /**
     * Unique identifier of the record type form.
     */
    formid: string;
    /**
     * Unique identifier of the form used when synchronizing customizations for the Microsoft Dynamics 365 client for Outlook.
     * @readonly
     */
    readonly formidunique: string;
    /**
     * Json representation of the form layout.
     */
    formjson: string;
    /**
     * Specifies whether this form is in the updated UI layout in Microsoft Dynamics CRM 2015 or Microsoft Dynamics CRM Online 2015 Update.
     * @display AIR Refreshed
     */
    formpresentation: FormPresentation;
    /**
     * XML representation of the form layout.
     */
    formxml: string;
    /**
     * Version in which the form is introduced.
     * @display Introduced Version
     */
    introducedversion: string;
    /**
     * Specifies whether this form is merged with the updated UI layout in Microsoft Dynamics CRM 2015 or Microsoft Dynamics CRM Online 2015 Update.
     * @display Refreshed
     */
    isairmerged: boolean;
    /**
     * Information that specifies whether this component can be customized.
     * @display Customizable
     */
    iscustomizable: BooleanManagedProperty<'iscustomizableanddeletable'>
    /**
     * Information that specifies whether the form or the dashboard is the system default.
     * @display Default Form
     */
    isdefault: boolean;
    /**
     * Information that specifies whether the dashboard is enabled for desktop.
     * @display Is Desktop Enabled
     */
    isdesktopenabled: boolean;
    /**
     * @display State
     * @readonly
     */
    readonly ismanaged: boolean;
    /**
     * Information that specifies whether the dashboard is enabled for tablet.
     * @display Is Tablet Enabled
     */
    istabletenabled: boolean;
    /**
     * Name of the form.
     * @display Name
     */
    name: string;
    /**
     * Code that represents the record type.
     * @display Entity Name
     */
    objecttypecode: string;
    /**
     * For internal use only.
     * @display Record Overwrite Time
     * @readonly
     */
    readonly overwritetime: Date;
    /**
     * @display Published On
     * @readonly
     */
    readonly publishedon: Date;
    /**
     * Unique identifier of the associated solution.
     * @display Solution
     * @readonly
     */
    readonly solutionid: string;
    /**
     * Type of the form, for example, Dashboard or Preview.
     * @display Form Type
     */
    type: FormType;
    /**
     * Unique Name.
     * @display Unique Name
     */
    uniquename: string;
    /**
     * For internal use only.
     */
    version: number;
    /**
     * Represents a version of customizations to be synchronized with the Microsoft Dynamics 365 client for Outlook.
     * @readonly 
     */
    readonly versionumber: bigint;
}

export type LookupProperties = {
    /** Unique identifier of the parent form. */
    readonly _ancestorformid_value: string;
    /** Unique identifier of the organization. */
    readonly _organizationid_value: string;
}

export type SingleValuedNavigationProperties = {
    ancestorformid: SystemForm;
    organizationid: Organization;
}

export type CollectionValuedNavigationProperties = {
    form_ancestor_form: SystemForm;
    processtrigger_systemform: ProcessTrigger;
    SystemForm_AsyncOperations: AsyncOperation;
    SystemForm_BulkDeleteFailures: BulkDeleteFailure;
}