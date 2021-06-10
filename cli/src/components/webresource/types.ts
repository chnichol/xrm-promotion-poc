export enum WebResourceType {
    HTML = 1,
    CSS = 2,
    JScript = 3,
    XML = 4,
    PNG = 5,
    JPG = 6,
    GIF = 7,
    XAP = 8,
    XSL = 9,
    ICO = 10
}

export interface WebResource extends Properties {}

interface Properties {
    content: string;
    description: string;
    displayname: string;
    name: string;
    webresourceid: string;
    webresourcetype: WebResourceType;
}