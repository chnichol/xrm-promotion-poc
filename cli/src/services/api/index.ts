import {
    Properties as AttributeMetadataProperties
} from '../../types/metadata/AttributeMetadata';
import {
    Properties as EntityProperties,
    CollectionValuedNavigationProperties as EntityCollections
} from '../../types/entity/Entity';
import {
    Properties as EntityMetadataProperties,
    CollectionValuedNavigationProperties as EntityMetadataCollections
} from '../../types/metadata/EntityMetadata';
import {
    Properties as PluginAssemblyProperties,
    LookupProperties as PluginAssemblyLookups,
    SingleValuedNavigationProperties as PluginAssemblySingles,
    CollectionValuedNavigationProperties as PluginAssemblyCollections
} from '../../types/entity/PluginAssembly';
import {
    Properties as SolutionProperties,
    LookupProperties as SolutionLookups,
    SingleValuedNavigationProperties as SolutionSingles,
    CollectionValuedNavigationProperties as SolutionCollections
} from '../../types/entity/Solution';
import {
    Properties as SystemFormProperties,
    LookupProperties as SystemFormLookups,
    SingleValuedNavigationProperties as SystemFormSingles,
    CollectionValuedNavigationProperties as SystemFormCollections
} from '../../types/entity/SystemForm';
import {
    Properties as WebResourceProperties,
    LookupProperties as WebResourceLookups,
    SingleValuedNavigationProperties as WebResourceSingles,
    CollectionValuedNavigationProperties as WebResourceCollections
} from '../../types/entity/WebResource';

import { Service } from '../serviceBuilder';
import { ApiBuilder } from './builders';
import { publish } from './handler';

export default class DynamicsAPI implements Service<'DynamicsAPI', DynamicsAPI> {
    public readonly name = 'DynamicsAPI';

    public init = () => new DynamicsAPI();

    public any = (url: string) => new ApiBuilder<unknown, unknown, unknown, unknown>(url);
    public attribute = (entityId: string) => new ApiBuilder<AttributeMetadataProperties, unknown, unknown, unknown>(`EntityDefinitions(${entityId})/Attributes`);
    public entity = new ApiBuilder<EntityProperties, unknown, unknown, EntityCollections>('entities');
    public entityMetadata = new ApiBuilder<EntityMetadataProperties, unknown, unknown, EntityMetadataCollections>('EntityDefinitions');
    public pluginAssembly = new ApiBuilder<PluginAssemblyProperties, PluginAssemblyLookups, PluginAssemblySingles, PluginAssemblyCollections>('pluginassemblies');
    public solution = new ApiBuilder<SolutionProperties, SolutionLookups, SolutionSingles, SolutionCollections>('solutions');
    public systemform = new ApiBuilder<SystemFormProperties, SystemFormLookups, SystemFormSingles, SystemFormCollections>('systemforms');
    public webresource = new ApiBuilder<WebResourceProperties, WebResourceLookups, WebResourceSingles, WebResourceCollections>('webresourceset');
    public publish = publish;
}