export type Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties> =
    Properties &
    LookupProperties & {
        [Key in keyof SingleValuedNavigationProperties]?: SingleValuedNavigationProperties[Key];
    } & {
        [Key in keyof CollectionValuedNavigationProperties]?: CollectionValuedNavigationProperties[Key][];
    };

export enum ComponentState {
    Published = 0,
    Unpublished = 1,
    Deleted = 2,
    DeletedUnpublished = 3
}