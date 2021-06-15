/**
 * Describes the type of an attribute.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/attributetypecode?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type AttributeTypeCode = 'Boolean'
    | 'Customer'
    | 'DateTime'
    | 'Decimal'
    | 'Double'
    | 'Integer'
    | 'Lookup'
    | 'Memo'
    | 'Money'
    | 'Owner'
    | 'PartyList'
    | 'Picklist'
    | 'State'
    | 'Status'
    | 'String'
    | 'Uniqueidentifier'
    | 'CalendarRules'
    | 'Virtual'
    | 'BigInt'
    | 'ManagedProperty'
    | 'EntityName'

export default AttributeTypeCode;