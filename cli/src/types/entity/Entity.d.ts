import { Component, ComponentState } from '../../components/types';
import CatalogAssignment from './CatalogAssignment';
import EntityAnalyticsConfig from './EntityAnalyticsConfig';
import SolutionComponentConfiguration from './SolutionComponentConfiguration';
import VirtualEntityMetadata from './VirtualEntityMetadata';

/**
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/entity?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type Entity = Component<Properties, {}, {}, CollectionValuedNavigationProperties>;
export default Entity;

export type Properties = {
    /**
     * The address table name of this entity.
     * @display Address Table Name
     */
    addresstablename: string;
    /**
     * The base table name of this entity.
     * @display Base Table Name
     */
    basetablename: string;
    /**
     * The collection name of this entity.
     * @display Collection Name
     */
    collectionname: string;
    /**
     * For internal use only.
     * @display Component State
     * @readonly
     */
    readonly componentstate: ComponentState;
    /**
     * Unique identifier of the entity.
     * @display Entity
     */
    entityid: string;
    /**
     * The entity set name of this entity.
     * @display Entity Set Name
     */
    entitysetname: string;
    /**
     * The extension table name of this entity.
     * @display Extension Table Name
     */
    extensiontablename: string;
    /**
     * The external collection name of this entity.
     * @display External Collection Name
     */
    externalcollectionname: string;
    /**
     * The external name of this entity.
     * @display External Name
     */
    externalname: string;
    /**
     * The logical collection name of this entity.
     * @display Logical Collection Name
     */
    logicalcollectionname: string;
    /**
     * The logical name of this entity.
     * @display Logical Name
     */
    logicalname: string;
    /**
     * The name of this entity.
     * @display Name
     */
    name: string;
    /**
     * The original localized collection name of this entity.
     * @display Original Localized Collection Name
     */
    originallocalizedcollectionname: string;
    /**
     * The original localized name of this entity.
     * @display Original Localized Name
     */
    originallocalizedname: string;
    /**
     * For internal use only.
     * @display Record Overwrite Time
     * @readonly
     */
    readonly overwritetime: Date;
    /**
     * The parent controlling attribute name of this entity.
     * @display Parent Controlling Attribute Name
     */
    parentcontrollingattributename: string;
    /**
     * The physical name of this entity.
     * @display Physical Name
     */
    physicalname: string;
    /**
     * The Report view name of this entity.
     * @display Report View Name
     */
    reportviewname: string;
    /**
     * Unique identifier of the associated solution.
     * @display Solution
     * @readonly
     */
    readonly solutionid: string;
    /**
     * The version number of this entity.
     * @display Version Number
     * @readonly
     */
    readonly versionnumber: number;
}

export type CollectionValuedNavigationProperties = {
    CatalogAssignments: CatalogAssignment;
    entity_entityanalyticsconfig: EntityAnalyticsConfig;
    entity_solutioncomponentconfiguration: SolutionComponentConfiguration;
    virtualentitymetadata_extensionofrecordid: VirtualEntityMetadata;
}