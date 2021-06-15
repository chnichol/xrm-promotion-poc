import AttributeRequiredLevel from '../enum/AttributeRequiredLevel';

/**
 * Represents the data to define a RequiredLevel property for an attribute.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/attributerequiredlevelmanagedproperty?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type AttributeRequiredLevelManagedProperty<T extends string> = {
    /** The value of the managed property. */
    Value: AttributeRequiredLevel;
    /** Whether the managed property value can be changed. */
    CanBeChanged: boolean;
    /** Logical name for the managed property. */
    ManagedPropertyLogicalName: T;
}

export default AttributeRequiredLevelManagedProperty;