export interface EntityAttribute {
    '@odata.type': string;
    LogicalName: string;
    MetadataId: string;
}

export type LookupResponse<T> = T;

export const ODataType: { 
    [key: string]: string;
} = {
    '#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata': 'Date',
    '#Microsoft.Dynamics.CRM.IntegerAttributeMetadata': 'number',
    '#Microsoft.Dynamics.CRM.StringAttributeMetadata': 'string'
};

export type QueryResponse<T> = {
    '@odata.context': string;
    value: T[];
}

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