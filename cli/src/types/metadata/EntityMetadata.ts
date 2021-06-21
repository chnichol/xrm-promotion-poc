import { Component } from '../../components/types';
import BooleanManagedProperty from '../complex/BooleanManagedProperty';
import EntitySetting from '../complex/EntitySetting';
import Label from '../complex/Label';
import SecurityPrivilegeMetadata from '../complex/SecurityPrivilegeMetadata';
import OwnershipTypes from '../enum/OwnershipTypes';
import AttributeMetadata from './AttributeMetadata';

/**
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/entitymetadata?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type EntityMetadata = Component<Properties, {}, {}, CollectionValuedNavigationProperties>;
export default EntityMetadata;

export type Properties = {
    /** Whether a custom activity should appear in the activity menus in the Web application. */
    ActivityTypeMask: number;
    /** Indicates whether the entity is enabled for auto created access teams. */
    AutoCreateAccessTeams: boolean;
    /** Indicates whether to automatically move records to the owner’s default queue when a record of this type is created or assigned. */
    AutoRouteToOwnerQueue: boolean;
    /**  */
    CanBeInCustomEntityAssociation: BooleanManagedProperty<'canbeincustomentityassociation'>;
    /** Whether the entity can be in a Many-to-Many entity relationship. */
    CanBeInManyToMany: BooleanManagedProperty<'canbeinmanytomany'>;
    /** Whether the entity can be the referenced entity in a One-to-Many entity relationship. */
    CanBePrimaryEntityInRelationship: BooleanManagedProperty<'canbeprimaryentityinrelationship'>;
    /** Whether the entity can be the referencing entity in a One-to-Many entity relationship. */
    CanBeRelatedEntityInRelationship: BooleanManagedProperty<'canberelatedentityinrelationship'>;
    /** Whether the hierarchical state of entity relationships included in your managed solutions can be changed. */
    CanChangeHierarchicalRelationship: BooleanManagedProperty<'canchangehierarchicalrelationship'>;
    /** For internal use only. */
    CanChangeTrackingBeEnabled: BooleanManagedProperty<'canchangetrackingbeenabled'>;
    /** Whether additional attributes can be added to the entity. */
    CanCreateAttributes: BooleanManagedProperty<'cancreateattributes'>;
    /** Whether new charts can be created for the entity. */
    CanCreateCharts: BooleanManagedProperty<'cancreatecharts'>;
    /** Whether new forms can be created for the entity. */
    CanCreateForms: BooleanManagedProperty<'cancreatecharts'>;
    /** Whether new views can be created for the entity. */
    CanCreateViews: BooleanManagedProperty<'cancreateviews'>;
    /** For internal use only. */
    CanEnableSyncToExternalSearchIndex: BooleanManagedProperty<'canenablesynctoexternalsearchindex'>;
    /** Whether any other entity properties not represented by a managed property can be changed. */
    CanModifyAdditionalSettings: BooleanManagedProperty<'canmodifyadditionalsettings'>;
    /** Whether the entity can trigger a workflow process. */
    CanTriggerWorkflow: boolean;
    /** Whether change tracking is enabled for an entity. */
    ChangeTrackingEnabled: boolean;
    /** The collection schema name of the entity. */
    CollectionSchemaName: string;
    /**  */
    CreatedOn: Date;
    /**  */
    DataProviderId: string;
    /**  */
    DataSourceId: string;
    /**  */
    DaysSinceRecordLastModified: number;
    /** The label containing the description for the entity. */
    Description: Label;
    /** A label containing the plural display name for the entity. */
    DisplayCollectionName: Label;
    /** A label containing the display name for the entity. */
    DisplayName: Label;
    /** Whether the entity will enforce custom state transitions. */
    EnforceStateTransitions: boolean;
    /** The hexadecimal code to represent the color to be used for this entity in the application. */
    EntityColor: string;
    /** The URL of the resource to display help content for this entity. */
    EntityHelpUrl: string;
    /** Whether the entity supports custom help content. */
    EntityHelpUrlEnabled: boolean;
    /** The name of the Web API entity set for this entity. */
    EntitySetName: string;
    /**  */
    ExternalCollectionName: string;
    /**  */
    ExternalName: string;
    /** Whether activities are associated with this entity. */
    HasActivities: boolean;
    /** Indicates whether the item of metadata has changed. */
    HasChanged: boolean;
    /**  */
    HasEmailAddress: boolean;
    /** Whether the entity will have a special relationship to the Feedback entity. */
    HasFeedback: boolean;
    /** Whether notes are associated with this entity. */
    HasNotes: boolean;
    /** The name of the image web resource for the large icon for the entity. */
    IconLargeName: string;
    /** The name of the image web resource for the medium icon for the entity. */
    IconMediumName: string;
    /** The name of the image web resource for the small icon for the entity. */
    IconSmallName: string;
    /**  */
    IconVectorName: string;
    /** A string identifying the solution version that the solution component was added in. */
    IntroducedVersion: string;
    /** Whether the entity is an activity. */
    IsActivity: boolean;
    /** Whether the email messages can be sent to an email address stored in a record of this type. */
    IsActivityParty: boolean;
    /** Whether the entity uses the updated user interface. */
    IsAIRUpdated: boolean;
    /** Whether auditing has been enabled for the entity. */
    IsAuditEnabled: BooleanManagedProperty<'canmodifyauditsettings'>;
    /** Whether the entity is available offline. */
    IsAvailableOffline: boolean;
    /**  */
    IsBPFEntity: boolean;
    /** Whether the entity is enabled for business process flows. */
    IsBusinessProcessEnabled: boolean;
    /** Whether the entity is a child entity. */
    IsChildEntity: boolean;
    /** Whether connections are enabled for this entity. */
    IsConnectionsEnabled: BooleanManagedProperty<'canmodifyconnectionsettings'>;
    /** Whether the entity is a custom entity. */
    IsCustomEntity: boolean;
    /** Whether the entity is customizable. */
    IsCustomizable: BooleanManagedProperty<'iscustomizable'>;
    /** Whether document management is enabled. */
    IsDocumentManagementEnabled: boolean;
    /**  */
    IsDocumentRecommendationsEnabled: boolean;
    /** Whether duplicate detection is enabled. */
    IsDuplicateDetectionEnabled: BooleanManagedProperty<'canmodifyduplicatedetectionsettings'>;
    /** Whether charts are enabled. */
    IsEnabledForCharts: boolean;
    /** Whether this entity is enabled for external channels */
    IsEnabledForExternalChannels: boolean;
    /** For internal use only. */
    IsEnabledForTrace: boolean;
    /** Whether the entity can be imported using the Import Wizard. */
    IsImportable: boolean;
    /** Whether the entity is enabled for interactive experience. */
    IsInteractionCentricEnabled: boolean;
    /** Whether the entity is an intersection table for two other entities. */
    IsIntersect: boolean;
    /** Whether Parature knowledge management integration is enabled for the entity. */
    IsKnowledgeManagementEnabled: boolean;
    /**  */
    IsLogicalEntity: boolean;
    /** Whether mail merge is enabled for this entity. */
    IsMailMergeEnabled: BooleanManagedProperty<'canmodifymailmergesettings'>;
    /** Whether the entity is part of a managed solution. */
    IsManaged: boolean;
    /** Whether entity mapping is available for the entity. */
    IsMappable: BooleanManagedProperty<'ismappable'>;
    /**  */
    IsMSTeamsIntegrationEnabled: boolean;
    /** Whether this entity is enabled for offline data with Dynamics 365 for tablets and Dynamics 365 for phones. */
    IsOfflineInMobileClient: BooleanManagedProperty<'canmodifymobileclientoffline'>;
    /** Whether OneNote integration is enabled for the entity. */
    IsOneNoteIntegrationEnabled: boolean;
    /** Whether optimistic concurrency is enabled for the entity */
    IsOptimisticConcurrencyEnabled: boolean;
    /** For internal use only. */
    IsPrivate: boolean;
    /** Whether the entity is enabled for quick create forms. */
    IsQuickCreateEnabled: boolean;
    /** For internal use only. */
    IsReadingPaneEnabled: boolean;
    /** Whether Microsoft Dynamics 365 for tablets users can update data for this entity. */
    IsReadOnlyInMobileClient: BooleanManagedProperty<'canmodifymobileclientreadonly'>;
    /** Whether the entity DisplayName and DisplayCollectionName can be changed by editing the entity in the application. */
    IsRenameable: BooleanManagedProperty<'isrenameable'>;
    /**  */
    IsSLAEnabled: boolean;
    /**  */
    IsSolutionAware: boolean;
    /** Whether the entity supports setting custom state transitions. */
    IsStateModelAware: boolean;
    /** Whether the entity is will be shown in Advanced Find. */
    IsValidForAdvancedFind: boolean;
    /** Whether the entity is enabled for queues. */
    IsValidForQueue: BooleanManagedProperty<'canmodifyqueuesettings'>;
    /** Whether Microsoft Dynamics 365 for phones users can see data for this entity. */
    IsVisibleInMobile: BooleanManagedProperty<'canmodifymobilevisibility'>;
    /** Whether Microsoft Dynamics 365 for tablets users can see data for this entity. */
    IsVisibleInMobileClient: BooleanManagedProperty<'canmodifymobileclientvisibility'>;
    /** The logical collection name. */
    LogicalCollectionName: string;
    /** The logical name for the entity. */
    LogicalName: string;
    /** A unique identifier for the metadata item. */
    MetadataId: string;
    /**  */
    MobileOfflineFilters: string;
    /**  */
    ModifiedOn: Date;
    /** The entity type code. */
    ObjectTypeCode: number;
    /** The ownership type for the entity. */
    OwnershipType: OwnershipTypes;
    /** The name of the attribute that is the primary id for the entity. */
    PrimaryIdAttribute: string;
    /** The name of the primary image attribute for an entity. */
    PrimaryImageAttribute: string;
    /** The name of the primary attribute for an entity. */
    PrimaryNameAttribute: string;
    /** The privilege metadata for the entity. */
    Privileges: SecurityPrivilegeMetadata[];
    /** The name of the entity that is recurring. */
    RecurrenceBaseEntityLogicalName: string;
    /** The name of the report view for the entity. */
    ReportViewName: string;
    /** The schema name for the entity. */
    SchemaName: string;
    /**  */
    SettingOf: string;
    /**  */
    Settings: EntitySetting[];
    /**  */
    SyncToExternalSearchIndex: boolean;
    /**  */
    UsesBusinessDataLabelTable: boolean;
}

export type CollectionValuedNavigationProperties = {
    Attributes: AttributeMetadata;
    Keys: any;
    ManyToManyRelationships: any;
    ManyToOneRelationships: any;
    OneToManyRelationships: any;
}