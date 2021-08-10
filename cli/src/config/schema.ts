import schema from './schema.json';

export interface Schema {
    groups: SchemaGroup[];
}

export interface SchemaGroup {
    description: string;
    properties: SchemaProperty[];
}

export type SchemaProperty = SchemaArrayProperty | SchemaNumberProperty | SchemaStringProperty;

export interface SchemaArrayProperty {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    type: 'array';
    value: string[];
}

export interface SchemaNumberProperty {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    type: 'number';
    value: number;
}

export interface SchemaStringProperty {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    type: 'string';
    value: string;
}

export default (schema as Schema);