import {
    Properties as EntityProperties,
    CollectionValuedNavigationProperties as EntityCollections
} from '../types/entity/Entity';
import {
    Properties as SolutionProperties,
    LookupProperties as SolutionLookups,
    SingleValuedNavigationProperties as SolutionSingles,
    CollectionValuedNavigationProperties as SolutionCollections
} from '../types/entity/Solution';
import {
    Properties as WebResourceProperties,
    LookupProperties as WebResourceLookups,
    SingleValuedNavigationProperties as WebResourceSingles,
    CollectionValuedNavigationProperties as WebResourceCollections
} from '../types/entity/WebResource';
import {
    Properties as EntityMetadataProperties,
    CollectionValuedNavigationProperties as EntityMetadataCollections
} from '../types/metadata/EntityMetadata';
import { ApiBuilder } from './builders';
import { publish } from './handler';

const api = {
    entity: new ApiBuilder<EntityProperties, {}, {}, EntityCollections>('entities'),
    entityMetadata: new ApiBuilder<EntityMetadataProperties, {}, {}, EntityMetadataCollections>('EntityDefinitions'),
    solution: new ApiBuilder<SolutionProperties, SolutionLookups, SolutionSingles, SolutionCollections>('solutions'),
    webresource: new ApiBuilder<WebResourceProperties, WebResourceLookups, WebResourceSingles, WebResourceCollections>('webresourceset'),
    publish
};

export default api;