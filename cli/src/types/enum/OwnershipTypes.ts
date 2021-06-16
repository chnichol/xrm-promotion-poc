/**
 * Specifies the type of ownership for an entity.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/ownershiptypes?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type OwnershipTypes = 'None'
    | 'UserOwned'
    | 'TeamOwned'
    | 'BusinessOwned'
    | 'OrganizationOwned'
    | 'BusinessParented'

export default OwnershipTypes;