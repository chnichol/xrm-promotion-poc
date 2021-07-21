import { AuthType, Component, ComponentState } from '..';
import BooleanManagedProperty from '../complex/BooleanManagedProperty';
import ManagedIdentity from './ManagedIdentity';
import Organization from './Organization';
import PluginType from './PluginType';
import SystemUser from './SystemUser';

/**
 * Assembly that contains one or more plug-in types.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/pluginassembly?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type PluginAssembly = Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties>;
export default PluginAssembly;

export enum IsolationMode {
    None = 1,
    Sandbox = 2,
    External = 3
}

export enum SourceType {
    Database = 0,
    Disk = 1,
    Normal = 2,
    AzureWebApp = 3
}

export type Properties = {
    /**
     * Specifies mode of authentication with web sources like WebApp.
     * @display Specifies mode of authentication with web sources
     */
    authType: AuthType;
    /**
     * For internal use only.
     * @display Component State
     * @readonly
     */
    readonly componentstate: ComponentState;
    /**
     * Bytes of the assembly, in Base64 format.
     */
    content: string;
    /**
     * Bytes of the assembly, in Base64 format.
     */
    content_binary: string;
    /**
     * Date and time when the plug-in assembly was created.
     * @display Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * Culture code for the plug-in assembly.
     * @display Culture
     */
    culture: string;
    /**
     * Customization Level.
     * @readonly
     */
    readonly customizationlevel: number;
    /**
     * Description of the plug-in assembly.
     * @display Description
     */
    description: string;
    /**
     * Version in which the form is introduced.
     * @display Introduced Version
     */
    introducedversion: string;
    /**
     * Information that specifies whether this component can be customized.
     * @display Customizable
     */
    iscustomizable: BooleanManagedProperty<'iscustomizableanddeletable'>;
    /**
     * Information that specifies whether this component should be hidden.
     * @display Hidden
     */
    ishidden: BooleanManagedProperty<'ishidden'>;
    /**
     * Information that specifies whether this component is managed.
     * @display State
     * @readonly
     */
    readonly ismanaged: boolean;
    /**
     * Information about how the plugin assembly is to be isolated at execution time; None / Sandboxed.
     * @display Isolation Mode
     */
    isolationmode: IsolationMode;
    /**
     * @readonly
     */
    readonly ispasswordset: boolean;
    /**
     * Major of the assembly version.
     * @readonly
     */
    readonly major: number;
    /**
     * Minor of the assembly version.
     * @readonly
     */
    readonly minor: number;
    /**
     * Date and time when the plug-in assembly was last modified.
     * @display Modified On
     * @readonly
     */
    readonly modifiedon: Date;
    /**
     * Name of the plug-in assembly.
     * @display Name
     */
    name: string;
    /**
     * For internal use only.
     * @display Record Overwrite Time
     * @readonly
     */
    readonly overwritetime: Date;
    /**
     * User Password.
     * @display User Password
     */
    password: string;
    /**
     * File name of the plug-in assembly. Used when the source type is set to 1.
     * @display Path
     */
    path: string;
    /**
     * Unique identifier of the plug-in assembly.
     */
    pluginassemblyid: string;
    /**
     * Unique identifier of the plug-in assembly.
     * @readonly
     */
    readonly pluginassemblyidunique: string;
    /**
     * Public key token of the assembly. This value can be obtained from the assembly by using reflection.
     * @display Public Key Token
     */
    publickeytoken: string;
    /**
     * Unique identifier of the associated solution.
     * @display Solution
     * @readonly
     */
    readonly solutionid: string;
    /**
     * Hash of the source of the assembly.
     */
    sourcehash: string;
    /**
     * Location of the assembly.
     * @display Source Type
     */
    sourcetype: SourceType;
    /**
     * Web Url.
     * @display Web Url
     */
    url: string;
    /**
     * User Name.
     * @display User Name
     */
    username: string;
    /**
     * Version number of the assembly. The value can be obtained from the assembly through reflection.
     * @display Version
     */
    version: string;
    /**
     * @readonly
     */
    readonly versionnumber: number;
}

export type LookupProperties = {
    /**
     * Unique identifier of the user who created the plug-in assembly.
     */
     readonly _createdby_value: string;
     /**
      * Unique identifier of the delegate user who created the plug-in assembly.
      */
     readonly _createdonbehalfby_value: string;
     /**
      * Unique identifier for managedidentity associated with plug-in assembly.
      */
     readonly _managedidentityid_value: string;
     /**
      * Unique identifier of the user who last modified the plug-in assembly.
      */
     readonly _modifiedby_value: string;
     /**
      * Unique identifier of the delegate user who last modified the plug-in assembly. 
      */
     readonly _modifiedonbehalfby_value: string;
     /**
      * Unique identifier of the organization associated with which the plug-in assembly is associated.
      */
     readonly _organizationid_value: string;
}

export type SingleValuedNavigationProperties = {
    createdby: SystemUser;
    createdonbehalfby: SystemUser;
    managedidentity: ManagedIdentity;
    modifiedby: SystemUser;
    modifiedonbehalfby: SystemUser;
    organizationid: Organization;
}

export type CollectionValuedNavigationProperties = {
    pluginassembly_plugintype: PluginType;
}