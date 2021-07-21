export default interface Lookup<T extends string> {
    entityType: T;
    id: string;
    name?: string;
}