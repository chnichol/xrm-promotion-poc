import { AuthenticationResult } from '@azure/msal-common';
import { Config, FileHandler } from '..';
import { Service, ServiceCollection } from '../serviceBuilder';

export default interface TokenStore extends Service<'TokenStore', TokenStore> {
    load: () => Promise<AuthenticationResult | undefined>;
    save: (token: AuthenticationResult) => Promise<void>;
}

export class FileTokenStore implements Service<'TokenStore', TokenStore> {
    private readonly _config: Config;
    private readonly _fileHandler: FileHandler;
    public readonly name = 'TokenStore';
    
    constructor (config: Config, fileHandler: FileHandler) {
        this._config = config;
        this._fileHandler = fileHandler;
    }

    public init = (services: ServiceCollection) => new FileTokenStore(
        services.get('Config'),
        services.get('FileHandler')
    );

    public load = async () => {
        if (await this._fileHandler.exists(this._config.project.cache.token)) {
            return this._fileHandler.loadFile<AuthenticationResult>(this._config.project.cache.token, 'json');
        }
    }

    public save = (token: AuthenticationResult) => this._fileHandler.saveFile<AuthenticationResult>(this._config.project.cache.token, token, 'json');
}