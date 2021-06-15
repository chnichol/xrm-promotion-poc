/**
 * Describes the requirement level for an attribute.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/attributerequiredlevel?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type AttributeRequiredLevel = 'None'
    | 'SystemRequired'
    | 'ApplicationRequired'
    | 'Recommended'

export default AttributeRequiredLevel;