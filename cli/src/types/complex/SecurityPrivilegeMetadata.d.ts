import PrivilegeType from '../enum/PrivilegeType';

/**
 * The metadata that describes a security privilege for access to an entity.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/securityprivilegemetadata?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type SecurityPrivilegeMetadata = {
    /** Whether the privilege can be basic access level. */
    CanBeBasic: boolean;
    /** Whether the privilege can be deep access level. */
    CanBeDeep: boolean;
    /** Whether the privilege can be global access level. */
    CanBeGlobal: boolean;
    /** Whether the privilege can be local access level. */
    CanBeLocal: boolean;
    /** Whether the privilege for an external party can be basic access level. */
    CanBeEntityReference: boolean;
    /** Whether the privilege for an external party can be parent access level. */
    CanBeParentEntityReference: boolean;
    /** The name of the privilege. */
    Name: string;
    /** The ID of the privilege. */
    PrivilegeId: string;
    /** The type of the privilege. */
    PrivilegeType: PrivilegeType;
}

export default SecurityPrivilegeMetadata;