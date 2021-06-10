import fs from 'fs/promises';
import { parse } from 'jsonc-parser';

interface Config {
    readonly auth: {
        readonly authority: string;
        readonly clientId: string;
    };
    readonly dynamics: string;
    readonly project: {
        readonly root?: string;
        readonly solutions?: string[];
    };
    readonly urls: {
        readonly home: string;
        readonly port: number;
        readonly redirect: string;
    };
}

export const getConfig = (): Promise<Config> => new Promise<Config>(resolve => {
    fs.readFile('./xrmconfig.jsonc', 'utf8').then(data => resolve(parse(data) as Config));
});