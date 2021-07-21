export default interface Collection<T> {
    forEach(callbackfn: (value: T, index: number) => void): void;
    get(): T[];
    get(index: number): T;
    get(name: string): T;
    get(predicate: (value: T, index: number) => boolean): T[];
    getLength(): number;
}