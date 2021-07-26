import { Component } from '..';
import AttributeRequiredLevelManagedProperty from '../complex/AttributeRequiredLevelManagedProperty';
import AttributeTypeDisplayName from '../complex/AttributeTypeDisplayName';
import BooleanManagedProperty from '../complex/BooleanManagedProperty';
import Label from '../complex/Label';
import AttributeTypeCode from '../enum/AttributeTypeCode';

type AttributeMetadata = Component<Properties, {}, {}, {}>;
export default AttributeMetadata;

export type Properties = {
    /** The name of the attribute that this attribute extends. */
    AttributeOf: string;
    /** The type for the attribute. */
    AttributeType: AttributeTypeCode;
    /** The name of the type for the attribute. */
    AttributeTypeName: AttributeTypeDisplayName;
    /**  */
    AutoNumberFormat: string;
    /** Whether field-level security can be applied to prevent a user from adding data to this attribute. */
    CanBeSecuredForCreate: boolean;
    /** Whether field-level security can be applied to prevent a user from viewing data from this attribute. */
    CanBeSecuredForRead: boolean;
    /** Whether field-level security can be applied to prevent a user from updating data for this attribute. */
    CanBeSecuredForUpdate: boolean;
    /** Whether any settings not controlled by managed properties can be changed. */
    CanModifyAdditionalSettings: BooleanManagedProperty<'canmodifyadditionalsettings'>;
    /** An organization-specific ID for the attribute used for auditing. */
    ColumnNumber: number;
    /**  */
    CreatedOn: Date;
    /** The Microsoft Dynamics 365 version that the attribute was deprecated in. */
    DeprecatedVersion: string;
    /** The label containing the description for the attribute. */
    Description?: Label;
    /** A label containing the display name for the attribute. */
    DisplayName?: Label;
    /** The logicla name of the entity that contains the attribute. */
    EntityLogicalName: string;
    /**  */
    ExternalName: string;
    /** Indicates whether the item of metadata has changed. */
    HasChanged: boolean;
    /** For internal use only. */
    InheritsFrom: string;
    /** A string identifying the solution version that the solution component was added in. */
    IntroducedVersion: string;
    /** Whether the attribute is enabled for auditing. */
    IsAuditEnabled: BooleanManagedProperty<'canmodifyauditsettings'>;
    /** Whether the attribute is a custom attribute. */
    IsCustomAttribute: boolean;
    /** Whether the attribute allows customization. */
    IsCustomizable: BooleanManagedProperty<'iscustomizable'>;
    /**  */
    IsDataSourceSecret: boolean;
    /** For internal use only. */
    IsFilterable: boolean;
    /** For internal use only. */
    IsGlobalFilterEnabled: BooleanManagedProperty<'canmodifyglobalfiltersettings'>;
    /** Whether the attribute is a logical attribute. */
    IsLogical: boolean;
    /** Whether the attribute is part of a managed solution. */
    IsManaged: boolean;
    /** Whether the attribute represents the unique identifier for the record. */
    IsPrimaryId: boolean;
    /** Whether the attribute represents the primary attribute for the entity. */
    IsPrimaryName: boolean;
    /** Whether the attribute display name can be changed. */
    IsRenameable: BooleanManagedProperty<'isrenameable'>;
    /**  */
    IsRequiredForForm: boolean;
    /** For internal use only. */
    IsRetrievable: boolean;
    /** For internal use only. */
    IsSearchable: boolean;
    /** Whether the attribute is secured for field-level security. */
    IsSecured: boolean;
    /** For internal use only. */
    IsSortableEnabled: BooleanManagedProperty<'canmodifyissortablesettings'>;
    /** Whether the attribute appears in Advanced Find. */
    IsValidForAdvancedFind: BooleanManagedProperty<'canmodifysearchsettings'>;
    /** Whether the value can be set when a record is created. */
    IsValidForCreate: boolean;
    /**  */
    IsValidForForm: boolean;
    /**  */
    IsValidForGrid: boolean;
    /** Whether the value can be retrieved. */
    IsValidForRead: boolean;
    /** Whether the value can be updated. */
    IsValidForUpdate: boolean;
    /**  */
    IsValidODataAttribute: boolean;
    /** The id of the attribute that is linked between appointments and recurring appointments. */
    LinkedAttributeId: string;
    /** The logical name for the attribute. */
    LogicalName: string;
    /** A unique identifier for the metadata item. */
    MetadataId: string;
    /**  */
    ModifiedOn: Date;
    /** The property that determines the data entry requirement level enforced for the attribute. */
    RequiredLevel: AttributeRequiredLevelManagedProperty<'canmodifyrequirementlevelsettings'>;
    /** The schema name for the attribute. */
    SchemaName: string;
    /** A value that indicates the source type for a calculated or rollup attribute. */
    SourceType: number;
}