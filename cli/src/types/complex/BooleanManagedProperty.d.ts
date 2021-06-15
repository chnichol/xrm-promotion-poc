
/**
 * Defines a managed property that stores a Boolean value.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/booleanmanagedproperty?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type BooleanManagedProperty<T extends string> = {
    /**
     * The value of the managed property.
     */
    Value: boolean;
    /**
     * Whether the managed property value can be changed.
     */
    CanBeChanged: boolean;
    /**
     * The logical name for the managed property.
     */
    ManagedPropertyLogicalName: T;
}

export default BooleanManagedProperty;