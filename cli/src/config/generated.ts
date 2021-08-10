export interface ConfigFile {
    /** Client ID of the Azure Active Directory App Registration used to authenticate to the Dynamics API. */
    aadClient?: string;
    /** Tenant ID of the Azure Active Directory App Registration used to authenticate to the Dynamics API. */
    aadTenant?: string;
    /** Root URL of your Dynamics environment. */
    dynamics?: string;
    /** Solutions to include in the project. */
    solutions?: string[];
    /** Directory plugin assembly projects are in. */
    pluginAssembliesDir?: string;
    /** Directory web resource projects are in. */
    webResourcesDir?: string;
    /** Root directory to store all source artifacts in. */
    rootDir?: string;
    /** Format to save system form layouts in. (json, xml) */
    systemFormFormat?: 'json' | 'xml';
    /** Directory to save generated type definition files. */
    typesDir?: string;
    /** URL to serve login screen from. */
    authHome?: string;
    /** Port number to open for handling authentication requests. */
    authPort?: number;
    /** URL to receive authentication tokens at. */
    authRedirect?: string;
}

export interface ConfigSettings extends Required<ConfigFile> {
}

export const defaults: ConfigSettings = {
    aadClient: '',
    aadTenant: '',
    dynamics: '',
    solutions: [],
    pluginAssembliesDir: 'pluginassemblies',
    webResourcesDir: 'webresources',
    rootDir: 'xrm',
    systemFormFormat: 'xml',
    typesDir: 'types',
    authHome: 'http://localhost:3000',
    authPort: 3000,
    authRedirect: 'http://localhost:3000/redirect'
};
export const validate = (config: ConfigFile): void => {
    const msg = (key: string) => `Configuration file missing required key "${key}"`;
    if (!config.aadClient) {
        throw msg('aadClient');
    }
    if (!config.aadTenant) {
        throw msg('aadTenant');
    }
    if (!config.dynamics) {
        throw msg('dynamics');
    }
    if (!config.solutions) {
        throw msg('solutions');
    }
};
