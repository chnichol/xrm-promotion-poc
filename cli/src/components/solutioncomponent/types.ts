type SolutionComponent = Properties & LookupProperties;

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
    readonly componenttype: ComponentType;
    readonly createdon: Date;
    readonly ismetadata: boolean;
    readonly modifiedon: Date;
    readonly objectid: string;
    readonly rootcomponentbehavior: ComponentBehavior;
    readonly rootsolutioncomponentid: string;
    readonly solutioncomponentid: string;
    readonly versionnumber: string;
}

export type LookupProperties = {
    readonly _createdby_value: string;
    readonly _createdonbehalfby_value: string;
    readonly _modifiedby_value: string;
    readonly _modifiedonbehalfby_value: string;
    readonly _solutionid_value: string;
}