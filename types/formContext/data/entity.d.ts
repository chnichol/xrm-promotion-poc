import Lookup from '../../common/lookup';

type Entity<T extends string> = {
    getDataXml(): string;
    getEntityName(): T;
    getEntityReference(): Lookup<T>;
    getId(): string;
    getIsDirty(): boolean;
    getPrimaryAttributeValue(): string;
    isValid(): boolean;
    save(): void;
}
export default Entity;