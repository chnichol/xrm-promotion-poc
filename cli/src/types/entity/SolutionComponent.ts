import { Component } from '..';
import Solution from "./Solution";
import SystemUser from './SystemUser';

/**
 * A component of a CRM solution.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/solutioncomponent?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type SolutionComponent = Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties>;
export default SolutionComponent;

export enum ComponentBehavior {
    IncludeSubcomponents = 0,
    DoNotIncludeSubcomponents = 1,
    IncludeAsShellOnly = 2
}

export enum ComponentType {
    AIConfiguration = 402,
    AIProject = 401,
    AIProjectType = 400,
    Attachment = 35,
    Attribute = 2,
    AttributeImageConfiguration = 431,
    AttributeLookupValue = 5,
    AttributeMap = 47,
    AttributePicklistValue = 4,
    CanvasApp = 300,
    ComplexControl = 64,
    ConnectionRole = 63,
    Connector_1 = 371,
    Connector_2 = 372,
    ContractTemplate = 37,
    ConvertRule = 154,
    ConvertRuleItem = 155,
    CustomControl = 66,
    CustomControlDefaultConfig = 68,
    DataSourceMapping = 166,
    DisplayString = 22,
    DisplayStringMap = 23,
    DuplicateRule = 44,
    DuplicateRuleCondition = 45,
    EmailTemplate = 36,
    Entity = 1,
    EntityAnalyticsConfiguration = 430,
    EntityImageConfiguration = 432,
    EntityKey = 14,
    EntityMap = 46,
    EntityRelationship = 10,
    EntityRelationshipRelationships = 12,
    EntityRelationshipRole = 11,
    EnvironmentVariableDefinition = 380,
    EnvironmentVariableValue = 381,
    FieldPermission = 71,
    FieldSecurityProfile = 70,
    Form = 24,
    HierarchyRule = 65,
    ImportMap = 208,
    Index = 18,
    KBArticleTemplate = 38,
    LocalizedLabel = 7,
    MailMergeTemplate = 39,
    ManagedProperty = 13,
    MobileOfflineProfile = 161,
    MobileOfflineProfileItem = 162,
    OptionSet = 9,
    Organization = 25,
    PluginAssembly = 91,
    PluginType = 90,
    Privilege = 16,
    PrivilegeObjectTypeCode = 17,
    Relationship = 3,
    RelationshipExtraCondition = 8,
    Report = 31,
    ReportCategory = 33,
    ReportEntity = 32,
    ReportVisibility = 34,
    RibbonCommand = 48,
    RibbonContextGroup = 49,
    RibbonCustomization = 50,
    RibbonDiff = 55,
    RibbonRule = 52,
    RibbonTabToCommandMap = 53,
    Role = 20,
    RolePrivilege = 21,
    RoutingRule = 150,
    RoutingRuleItem = 151,
    SavedQuery = 26,
    SavedQueryVisualization = 59,
    SDKMessageProcessingStep = 92,
    SDKMessageProcessingStepImage = 93,
    SDKMessage = 201,
    SDKMessageFilter = 202,
    SdkMessagePair = 203,
    SdkMessageRequest = 204,
    SdkMessageRequestField = 205,
    SdkMessageResponse = 206,
    SdkMessageResponseField = 207,
    ServiceEndpoint = 95,
    SimilarityRule = 165,
    SiteMap = 62,
    SLA = 152,
    SLAItem = 153,
    SystemForm = 60,
    ViewAttribute = 6,
    WebResource = 61,
    WebWizard = 210,
    Workflow = 29
}

export type Properties = {
    /**
     * The object type code of the component.
     * @display Object Type Code
     * @readonly
     */
    readonly componenttype: ComponentType;
    /**
     * Date and time when the solution was created.
     * @display Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * Indicates whether this component is metadata or data.
     * @display Is this component metadata
     * @readonly
     */
    readonly ismetadata: boolean;
    /**
     * Date and time when the solution was last modified.
     * @display Modified On
     * @readonly
     */
    readonly modifiedon: Date;
    /**
     * Unique identifier of the object with which the component is associated.
     * @display Regarding
     * @readonly
     */
    readonly objectid: string;
    /**
     * Indicates the include behavior of the root component.
     * @display Root Component Behavior
     * @readonly
     */
    readonly rootcomponentbehavior: ComponentBehavior;
    /**
     * The parent ID of the subcomponent, which will be a root.
     * @display Root Solution Component ID
     * @readonly
     */
    readonly rootsolutioncomponentid: string;
    /**
     * Unique identifier of the solution component.
     * @display Solution Component Identifier
     * @readonly
     */
    readonly solutioncomponentid: string;
    /**
     * @readonly
     */
    readonly versionnumber: string;
}

export type LookupProperties = {
    /**
     * Unique identifier of the user who created the solution.
     * @readonly
     */
    readonly _createdby_value: string;
    /**
     * Unique identifier of the delegate user who created the solution.
     * @readonly
     */
    readonly _createdonbehalfby_value: string;
    /**
     * Unique identifier of the user who last modified the solution.
     * @readonly
     */
    readonly _modifiedby_value: string;
    /**
     * Unique identifier of the delegate user who modified the solution.
     * @readonly
     */
    readonly _modifiedonbehalfby_value: string;
    /**
     * Unique identifier of the solution.
     * @readonly
     */
    readonly _solutionid_value: string;
}

export type SingleValuedNavigationProperties = {
    createdonbehalfby: SystemUser;
    modifiedonbehalfby: SystemUser;
    rootsolutioncomponentid_solutioncomponent: SolutionComponent;
    solutionid: Solution;
}

export type CollectionValuedNavigationProperties = {
    solutioncomponent_parent_solutioncomponent: SolutionComponent;
}