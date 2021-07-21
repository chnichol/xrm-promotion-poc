/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export default interface Relationship {
    /** Name of the column used for the relationship. */
    attributeName: string;
    /** Name of the relationship. */
    name: string;
    /** Name of the navigation property for this relationship. */
    navigationPropertyName: string;
    /**
     * Relationship type. Specify one of the following values:
     * 0. OneToMany
     * 1. ManyToMany
     */
    relationshipType: 0 | 1;
    /**
     * Role type in relationship. Specify one of the following values:
     * 1. Referencing
     * 2. AssociationEntity
     */
    roleType: 1 | 2;
}