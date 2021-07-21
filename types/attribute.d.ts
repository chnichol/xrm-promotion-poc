export default interface Attribute<T> {
    getValue(): T;
    setValue(value: T): void;
}