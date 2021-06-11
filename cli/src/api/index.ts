import {
    Properties as SolutionProperties,
    LookupProperties as SolutionLookups,
    SingleValuedNavigationProperties as SolutionSingles,
    CollectionValuedNavigationProperties as SolutionCollections
} from '../components/solution/types';
import { ApiBuilder } from './builders';
import { publish } from './handler';

const api = {
    solution: new ApiBuilder<SolutionProperties, SolutionLookups, SolutionSingles, SolutionCollections>('solutions'),
    publish
};

export default api;