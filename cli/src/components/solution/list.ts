import { Argv } from 'yargs';
import api from '../../api';
import { isUuid } from '../../common';
import { getConfig } from '../../common/config';
import { getProjectSolutions } from '.';

// TODO: Figure out how best to implement this using the standard CLI patterns.

// IDEA: Remove this command and replace it with the solutioncomponent.list command.

interface Options {
    source?: string;
}

type ListRow = {
    solutionid: string;
    uniquename: string;
    isConfig: boolean;
    isLocal: boolean;
    isRemote: boolean;
}

const list = async () => {
    const solutions = new Map<string, ListRow>();
    ((await getConfig()).project.solutions ?? []).forEach(s => {
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
    (await api.solution.query({ select: [ 'solutionid', 'uniquename' ] }).execute()).forEach(s => {
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