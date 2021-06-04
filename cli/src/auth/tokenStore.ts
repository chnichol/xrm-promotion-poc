import fs from 'fs';
import { AuthenticationResult } from '@azure/msal-node';

export default class TokenStore {
    private _path: string;

    constructor (path: string) {
        this._path = path;
    }

    loadToken = (): Promise<AuthenticationResult | undefined> => new Promise(resolve => {
        if (fs.existsSync(this._path) && fs.lstatSync(this._path).isFile) {
            fs.readFile(
                this._path,
                'utf8',
                (_, data) => resolve(data ? JSON.parse(data) as AuthenticationResult : undefined)
            );
        }
        else {
            resolve(undefined);
        }
    });

    saveToken = (token: AuthenticationResult): Promise<void> => new Promise<void>(resolve => {
        fs.writeFile(this._path, JSON.stringify(token, undefined, 4), () => resolve());
    });
}