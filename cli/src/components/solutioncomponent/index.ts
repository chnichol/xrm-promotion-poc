import SolutionComponent, { ComponentType } from '../../types/entity/SolutionComponent';
import { getProjectSolutions } from '../solution';

export const getProjectSolutionComponents = async (componentType?: ComponentType): Promise<[Set<string>, SolutionComponent[]]> => {
    const components = new Set<string>();
    const results: SolutionComponent[] = [];
    (await getProjectSolutions()).forEach(s => {
        results.push(...(s.solution_solutioncomponent ?? []).filter(c => {
            if (c.componenttype !== componentType) {
                return false;
            }
            if (components.has(c.solutioncomponentid)) {
                return false;
            }
            else {
                components.add(c.solutioncomponentid);
                return true;
            }
        }));
    });
    return [ components, results ];
}