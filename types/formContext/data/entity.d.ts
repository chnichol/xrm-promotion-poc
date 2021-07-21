import Lookup from '../../common/lookup';

export default interface Entity<T extends string> {
    getDataXml(): string;
    getEntityName(): T;
    getEntityReference(): Lookup<T>;
    getId(): string;
    getIsDirty(): boolean;
    getPrimaryAttributeValue(): string;
    isValid(): boolean;
    save(): void;
}