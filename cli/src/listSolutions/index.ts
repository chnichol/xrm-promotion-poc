import fs from 'fs/promises';
import { query } from "../api"
import { getProjectSolutions } from "../getSolution";

interface Options {
    remote?: boolean;
}

const main = async (remote: boolean) => remote
    ? (await query<any>('solutions')).value
    : Promise.all(
        (await getProjectSolutions()).map(async (s) => JSON.parse(await fs.readFile(s, 'utf8')))
    )

const cli = async (options: Options) => {
    const solutions = await main(options.remote || false);
    const rows = solutions
        .sort((s1, s2) => s1.uniquename.localeCompare(s2.uniquename))
        .map(s => ({ uniquename: s.uniquename, solutionid: s.solutionid }));
    console.table(rows);
}

export default main;
export {
    cli
}