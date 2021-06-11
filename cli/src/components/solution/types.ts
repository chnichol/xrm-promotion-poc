import SolutionComponent from '../solutioncomponent/types';

/**
 * A solution which contains CRM customizations.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/solution?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
export interface Solution extends Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties {}

export enum SolutionType {
    None = 0,
    Snapshot = 1,
    Internal = 2
}

export interface Properties {
    /**
     * Date and time when the solution was created.
     * @alias Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * Description of the solution.
     * @alias Description
     */
    description: string;
    /**
     * User display name for the solution.
     * @alias Display Name
     */
    friendlyname: string;
    /**
     * Date and time when the solution was installed/upgraded.
     * @alias Installed On
     * @readonly
     */
    readonly installedon: Date;
    /**
     * Information about whether the solution is api managed.
     * @alias Is Api Managed Solution
     * @readonly
     */
    readonly isapimanaged: boolean;
    /**
     * Indicates whether the solution is managed or unmanaged.
     * @alias Package Type
     * @readonly
     */
    readonly ismanaged: boolean;
    /**
     * Indicates whether the solution is visible outside of the platform.
     * @alias Is Visible Outside Platform
     * @readonly
     */
    readonly isvisible: boolean;
    /**
     * Date and time when the solution was last modified.
     * @alias Modified On
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
     * @alias Solution Identifier
     */
    solutionid: string;
    /**
     * Solution package source organization version.
     * @alias Solution Package Version
     */
    solutionpackageversion: string;
    /**
     * Solution Type.
     * @alias Solution Type
     */
    solutiontype: SolutionType;
    /**
     * The template suffix of this solution.
     * @alias Suffix
     */
    templatesuffix: string;
    /**
     * Thumbprint of the solution signature.
     * @alias Thumbprint
     */
    thumbprint: string;
    /**
     * The unique name of this solution.
     * @alias Name
     */
    uniquename: string;
    /**
     * Date and time when the solution was updated.
     * @alias Updated On
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
     * @alias Version
     */
    version: string;
    /**
     * @readonly
     */
    readonly versionnumber: number;
}

export interface LookupProperties {
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

export interface SingleValuedNavigationProperties {
    /**
     * @see WebResource.solution_configuration_webresource
     */
    configurationpageid: any;
    /**
     * @see SystemUser.lk_solution_createdby
     */
    createdby: any;
    /**
     * @see SystemUser.lk_solutionbase_createdonbehalfby
     */
    createdonbehalfby: any;
    /**
     * @see FileAttachment.solution_fileid
     */
    fileid: any;
    /**
     * @see SystemUser.lk_solution_modifiedby
     */
    modifiedby: any;
    /**
     * @see SystemUser.lk_solutionbase_modifiedonbehalfby
     */
    modifiedonbehalfby: any;
    /**
     * @see Organization.organization_solution
     */
    organizationid: any;
    /**
     * @see Solution.solution_parent_solution
     */
    parentsolutionid: any;
    /**
     * @see Publisher.publisher_solution
     */
    publisherid: any;
}

export interface CollectionValuedNavigationProperties {
    /**
     * @see CanvasApp.FK_CanvasApp_Solution
     */
    FK_CanvasApp_Solution: any[];
    /**
     * @see Package.package_solution
     */
    package_solution: any[];
    /**
     * @see FileAttachment.FileAttachment_Solution
     */
    regardingobjectid_fileattachment_solution: any[];
    /**
     * @see FieldPermission.solution_fieldpermission
     */
    solution_fieldpermission: any[]
    /**
     * @see FieldSecurityProfile.solution_fieldsecurityprofile
     */
    solution_fieldsecurityprofile: any[];
    /**
     * @see Solution.parentsolutionid
     */
    solution_parent_solution: any[];
    /**
     * @see Privilege.solution_privilege
     */
    solution_privilege: any[];
    /**
     * @see Role.solution_role
     */
    solution_role: {
        roleid: string;
        name: string;
    };
    /**
     * @see SolutionComponent.solutionid
     */
    solution_solutioncomponent: SolutionComponent;
    /**
     * @see SyncError.regardingobjectid_solution_syncerror
     */
    solution_Solution_SyncErrors: any[];
}