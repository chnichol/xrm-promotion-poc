import { Component } from '../../components/types';
import CanvasApp from './CanvasApp';
import FieldPermission from './FieldPermission';
import FieldSecurityProfile from './FieldSecurityProfile';
import FileAttachment from './FileAttachment';
import Organization from './Organization';
import Package from './Package';
import Privilege from './Privilege';
import Publisher from './Publisher';
import Role from './Role';
import SolutionComponent from './SolutionComponent';
import SyncError from './SyncError';
import SystemUser from './SystemUser';
import WebResource from './WebResource';

/**
 * A solution which contains CRM customizations.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/solution?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type Solution = Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties>;
export default Solution;

export enum SolutionType {
    None = 0,
    Snapshot = 1,
    Internal = 2
}

export type Properties = {
    /**
     * Date and time when the solution was created.
     * @display Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * Description of the solution.
     * @display Description
     */
    description: string;
    /**
     * User display name for the solution.
     * @display Display Name
     */
    friendlyname: string;
    /**
     * Date and time when the solution was installed/upgraded.
     * @display Installed On
     * @readonly
     */
    readonly installedon: Date;
    /**
     * Information about whether the solution is api managed.
     * @display Is Api Managed Solution
     * @readonly
     */
    readonly isapimanaged: boolean;
    /**
     * Indicates whether the solution is managed or unmanaged.
     * @display Package Type
     * @readonly
     */
    readonly ismanaged: boolean;
    /**
     * Indicates whether the solution is visible outside of the platform.
     * @display Is Visible Outside Platform
     * @readonly
     */
    readonly isvisible: boolean;
    /**
     * Date and time when the solution was last modified.
     * @display Modified On
     * @readonly
     */
    readonly modifiedon: Date;
    /**
     * @readonly
     */
    readonly pinpointassetid: string | null;
    /**
     * Identifier of the publisher of this solution in Microsoft Pinpoint.
     * @readonly
     */
    readonly pinpointpublisherid: number;
    /**
     * Default locale of the solution in Microsoft Pinpoint.
     * @readonly
     */
    readonly pinpointsolutiondefaultlocale: string;
    /**
     * Identifier of the solution in Microsoft Pinpoint.
     * @readonly
     */
    readonly pinpointsolutionid: number;
    /**
     * Unique identifier of the solution.
     * @display Solution Identifier
     */
    solutionid: string;
    /**
     * Solution package source organization version.
     * @display Solution Package Version
     */
    solutionpackageversion: string;
    /**
     * Solution Type.
     * @display Solution Type
     */
    solutiontype: SolutionType;
    /**
     * The template suffix of this solution.
     * @display Suffix
     */
    templatesuffix: string;
    /**
     * Thumbprint of the solution signature.
     * @display Thumbprint
     */
    thumbprint: string;
    /**
     * The unique name of this solution.
     * @display Name
     */
    uniquename: string;
    /**
     * Date and time when the solution was updated.
     * @display Updated On
     * @readonly
     */
    readonly updatedon: Date;
    /**
     * Contains component info for the solution upgrade operation.
     * @readonly
     */
    readonly upgradeinfo: string;
    /**
     * Solution version, used to identify a solution for upgrades and hotfixes.
     * @display Version
     */
    version: string;
    /**
     * @readonly
     */
    readonly versionnumber: number;
}

export type LookupProperties = {
    /**
     * A link to an optional configuration page for this solution.
     * @readonly
     */
    readonly _configurationpageid_value: string;
    /**
     * Unique identifier of the user who created the solution.
     */
    readonly _createdby_value: string;
    /**
     * Unique identifier of the delegate user who created the solution.
     */
    readonly _createdonbehalfby_value: string;
    /**
     * Unique identifier of the user who last modified the solution.
     */
    readonly _modifiedby_value: string;
    /**
     * Unique identifier of the delegate user who modified the solution.
     */
    readonly _modifiedonbehalfby_value: string;
    /**
     * Unique identifier of the organization associated with the solution.
     */
    readonly _organizationid_value: string;
    /**
     * Unique identifier of the parent solution. Should only be non-null if this solution is a patch.
     */
    readonly _parentsolutionid_value: string;
    /**
     * Unique identifier of the publisher.
     */
    readonly _publisherid_value: string;
}

export type SingleValuedNavigationProperties = {
    configurationpageid: WebResource;
    createdby: SystemUser;
    createdonbehalfby: SystemUser;
    fileid: FileAttachment;
    modifiedby: SystemUser;
    modifiedonbehalfby: SystemUser;
    organizationid: Organization;
    parentsolutionid: Solution;
    publisherid: Publisher;
}

export type CollectionValuedNavigationProperties = {
    FK_CanvasApp_Solution: CanvasApp;
    package_solution: Package;
    regardingobjectid_fileattachment_solution: FileAttachment;
    solution_fieldpermission: FieldPermission;
    solution_fieldsecurityprofile: FieldSecurityProfile;
    solution_parent_solution: Solution;
    solution_privilege: Privilege;
    solution_role: Role;
    solution_solutioncomponent: SolutionComponent;
    solution_Solution_SyncErrors: SyncError;
}