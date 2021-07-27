import {
    Properties as AttributeMetadataProperties
} from '../types/metadata/AttributeMetadata';
import {
    Properties as EntityProperties,
    CollectionValuedNavigationProperties as EntityCollections
} from '../types/entity/Entity';
import {
    Properties as EntityMetadataProperties,
    CollectionValuedNavigationProperties as EntityMetadataCollections
} from '../types/metadata/EntityMetadata';
import {
    Properties as PluginAssemblyProperties,
    LookupProperties as PluginAssemblyLookups,
    SingleValuedNavigationProperties as PluginAssemblySingles,
    CollectionValuedNavigationProperties as PluginAssemblyCollections
} from '../types/entity/PluginAssembly';
import {
    Properties as SolutionProperties,
    LookupProperties as SolutionLookups,
    SingleValuedNavigationProperties as SolutionSingles,
    CollectionValuedNavigationProperties as SolutionCollections
} from '../types/entity/Solution';
import {
    Properties as SystemFormProperties,
    LookupProperties as SystemFormLookups,
    SingleValuedNavigationProperties as SystemFormSingles,
    CollectionValuedNavigationProperties as SystemFormCollections
} from '../types/entity/SystemForm';
import {
    Properties as WebResourceProperties,
    LookupProperties as WebResourceLookups,
    SingleValuedNavigationProperties as WebResourceSingles,
    CollectionValuedNavigationProperties as WebResourceCollections
} from '../types/entity/WebResource';

import { ApiBuilder } from './builders';
import { publish } from './handler';

const api = {
    any: (url: string): ApiBuilder<unknown, unknown, unknown, unknown> => new ApiBuilder<unknown, unknown, unknown, unknown>(url),
    attribute: (entityId: string): ApiBuilder<AttributeMetadataProperties, unknown, unknown, unknown> => new ApiBuilder<AttributeMetadataProperties, unknown, unknown, unknown>(`EntityDefinitions(${entityId})/Attributes`),
    entity: new ApiBuilder<EntityProperties, unknown, unknown, EntityCollections>('entities'),
    entityMetadata: new ApiBuilder<EntityMetadataProperties, unknown, unknown, EntityMetadataCollections>('EntityDefinitions'),
    pluginAssembly: new ApiBuilder<PluginAssemblyProperties, PluginAssemblyLookups, PluginAssemblySingles, PluginAssemblyCollections>('pluginassemblies'),
    solution: new ApiBuilder<SolutionProperties, SolutionLookups, SolutionSingles, SolutionCollections>('solutions'),
    systemform: new ApiBuilder<SystemFormProperties, SystemFormLookups, SystemFormSingles, SystemFormCollections>('systemforms'),
    webresource: new ApiBuilder<WebResourceProperties, WebResourceLookups, WebResourceSingles, WebResourceCollections>('webresourceset'),
    publish
};

export default api;