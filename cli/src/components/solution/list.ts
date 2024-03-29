import { isUuid } from 'helpers';
import services from 'services';
import { getProjectSolutions } from '.';

type ListRow = {
    solutionid: string;
    uniquename: string;
    isConfig: boolean;
    isLocal: boolean;
    isRemote: boolean;
}

const list = async (): Promise<void> => {
    const api = services('DynamicsAPI');
    const config = services('Config');
    console.log(api);
    console.log(config);
    const solutions = new Map<string, ListRow>();
    (config.settings.solutions ?? []).forEach(s => {
        if (!isUuid(s)) {
            return;
        }
        if (solutions.has(s)) {
            const solution = solutions.get(s);
            if (solution) {
                solution.isConfig = true;
            }
        }
        else {
            solutions.set(s, {
                solutionid: s,
                uniquename: '',
                isConfig: true,
                isLocal: false,
                isRemote: false
            });
        }
    });
    (await getProjectSolutions()).forEach(s => {
        if (solutions.has(s.solutionid)) {
            const solution = solutions.get(s.solutionid);
            if (solution) {
                solution.isLocal = true;
                solution.uniquename = s.uniquename;
            }
        }
        else {
            solutions.set(s.solutionid, {
                solutionid: s.solutionid,
                uniquename: s.uniquename,
                isConfig: false,
                isLocal: true,
                isRemote: false
            });
        }
    });
    (await api.solution.query({ select: ['solutionid', 'uniquename'] }).execute()).forEach(s => {
        if (solutions.has(s.solutionid)) {
            const solution = solutions.get(s.solutionid);
            if (solution) {
                solution.isRemote = true;
                solution.uniquename = s.uniquename;
            }
        }
        else {
            solutions.set(s.solutionid, {
                solutionid: s.solutionid,
                uniquename: s.uniquename,
                isConfig: false,
                isLocal: false,
                isRemote: true
            });
        }
    });
    const rows = Array.from(solutions)
        .sort((s1, s2) => s1[1].uniquename.localeCompare(s2[1].uniquename))
        .map(s => ({
            'Solution ID': s[1].solutionid,
            'Unique Name': s[1].uniquename,
            'Is Config': s[1].isConfig,
            'Is Local': s[1].isLocal,
            'Is Remote': s[1].isRemote
        }));
    console.table(rows);
};

export default list;