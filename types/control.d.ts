export default interface Control {
    getAttribute(): any;
    refresh(): void;
    getName(): string;
    getObject(): any;
    getLabel(): string;
    getOptions(): any;
    getParent(): any;
    getInitialUrl(): string;
    getEntityTypes(): string[];
}