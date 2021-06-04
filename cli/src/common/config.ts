import fs from 'fs/promises';
import { parse } from 'jsonc-parser';

interface Auth {
    readonly authority: string;
    readonly clientId: string;
}

interface Config {
    readonly auth: Auth;
    readonly dynamics: string;
    readonly urls: Urls;
}

interface Urls {
    readonly home: string;
    readonly port: number;
    readonly redirect: string;
}

export const getConfig = (): Promise<Config> => new Promise<Config>(resolve => {
    fs.readFile('./xrmconfig.jsonc', 'utf8').then(data => resolve(parse(data) as Config));
});