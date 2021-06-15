/**
 * Describes the type of operation for the privilege
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/privilegetype?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type PrivilegeType = 'None'
    | 'Create'
    | 'Read'
    | 'Write'
    | 'Delete'
    | 'Assign'
    | 'Share'
    | 'Append'
    | 'AppendTo'

export default PrivilegeType;