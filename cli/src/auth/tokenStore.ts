import fs from 'fs/promises';
import path from 'path';
import { AuthenticationResult } from '@azure/msal-node';
import { exists, mkdir, parseFile, saveFile } from '../common';

export default class TokenStore {
    private _path: string;

    constructor (p: string) {
        this._path = p;
    }

    loadToken = async (): Promise<AuthenticationResult | undefined> => {
        if (await exists(this._path) && (await fs.lstat(this._path)).isFile()) {
            return await parseFile<AuthenticationResult>(this._path);
        }
        else {
            return undefined;
        }
    }

    saveToken = async (token: AuthenticationResult): Promise<void> => {
        await mkdir(path.dirname(this._path));
        await saveFile(this._path, token);
    }
}