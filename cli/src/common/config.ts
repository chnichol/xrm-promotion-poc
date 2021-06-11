import fs from 'fs/promises';
import path from 'path';
import { parse } from 'jsonc-parser';

interface Config {
    auth: {
        authority: string;
        clientId: string;
    };
    dynamics: string;
    project: {
        root: string;
        solutions: string[];
    };
    urls: {
        home: string;
        port: number;
        redirect: string;
    };
}

export const getConfig = (): Promise<Config> => new Promise<Config>(resolve => {
    fs.readFile('./xrmconfig.jsonc', 'utf8').then(data => resolve(parse(data) as Config));
});

export const getPath = (config: Config) => ({
    solutions: path.join(config.project.root, 'solutions'),
    solution: (solution: { uniquename: string }) => path.join(config.project.root, 'solutions', solution.uniquename + '.json')
})

export const saveConfig = (config: Config): Promise<void> => fs.writeFile('./xrmconfig.jsonc', JSON.stringify(config, undefined, 4), 'utf8')