import BooleanManagedProperty from "../complex/BooleanManagedProperty";
import { Component, ComponentState } from "../../components/types";
import FileAttachment from "./FileAttachment";
import Organization from './Organization';
import SystemUser from "./SystemUser";
import Solution from "./Solution";
import Theme from "./Theme";
import SavedQueryVisualization from "./SavedQueryVisualization";
import UserQueryVisualization from "./UserQueryVisualization";

/**
 * Data equivalent to files used in Web development. Web resources provide client-side components that are used to provide custom user interface elements.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/webresource?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type WebResource = Component<Properties, LookupProperties, SingleValuedNavigationProperties, CollectionValuedNavigationProperties>;
export default WebResource;

export enum WebResourceType {
    HTML = 1,
    CSS = 2,
    JScript = 3,
    XML = 4,
    PNG = 5,
    JPG = 6,
    GIF = 7,
    XAP = 8,
    XSL = 9,
    ICO = 10
}

export type Properties = {
    /**
     * Information that specifies whether this component can be deleted.
     * @display Can Be Deleted
     */
    canbedeleted: BooleanManagedProperty<'canbedeleted'>;
    /**
     * For internal use only.
     * @display Component State
     * @readonly
     */
    readonly componentstate: ComponentState;
    /**
     * Byes of the web resource, in Base64 format.
     */
    content: string;
    /**
     * Bytes of the web resource, in Base64 format.
     */
    content_binary: string;
    /**
     * Reference to the content file on Azure.
     * @readonly
     */
    readonly contentfileref: string;
    /**
     * @readonly
     */
    readonly contentfileref_name: string;
    /**
     * Json representation of the content of the resource.
     */
    contentjson: string;
    /**
     * Reference to the Json content file on Azure.
     * @readonly
     */
    readonly contentjsonfileref: string;
    /**
     * @readonly
     */
    readonly contentjsonfileref_name: string;
    /**
     * Date and time when the web resource was created.
     * @display Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * For internal use only.
     * @display DependencyXML
     */
    dependencyxml: string;
    /**
     * Description of the web resource.
     * @display Description
     */
    description: string;
    /**
     * Display name of the web resource.
     * @display Display Name
     */
    displayname: string;
    /**
     * Version in which the form is introduced.
     * @display Introduced Version
     */
    introducedversion: string;
    /**
     * Information that specifies whether this web resource is available for mobile client in offline mode.
     * @display Is Available For Mobile Offline
     */
    isavailableformobileoffline: boolean;
    /**
     * Information that specifies whether this component can be customized.
     * @display Customizable
     */
    iscustomizable: BooleanManagedProperty<'iscustomizableanddeletable'>;
    /**
     * Information that specifies whether this web resource is enabled for mobile client.
     * @display Is Enabled For Mobile Client
     */
    isenabledformobileclient: boolean;
    /**
     * Information that specifies whether this component should be hidden.
     * @display Hidden
     */
    ishidden: BooleanManagedProperty<'ishidden'>;
    /**
     * @readonly
     */
    readonly ismanaged: boolean;
    /**
     * Language of the web resource.
     * @display Language
     */
    languagecode: number;
    /**
     * Date and time when the web resource was last modified.
     * @display Modified On
     * @readonly
     */
    readonly modifiedon: Date;
    /**
     * Name of the web resource.
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
     * Silverlight runtime version number required by a silverlight web resource.
     * @display Silverlight Version
     */
    silverlightversion: string;
    /**
     * Unique identifier of the associated solution.
     * @display Solution
     * @readonly
     */
    readonly solutionid: string;
    /**
     * @readonly
     */
    readonly versionnumber: number;
    /**
     * Unique identifier of the web resource.
     * @display Web Resource Identifier
     * @readonly
     */
    readonly webresourceid: string;
    /**
     * For internal use only.
     * @readonly
     */
    readonly webresourceidunique: string;
    /**
     * Drop-down list for selecting the type of the web resource.
     * @display Type
     */
    webresourcetype: WebResourceType;
}

export type LookupProperties = {
    /**
     * Unique identifier of the user who created the web resource.
     */
    readonly _createdby_value: string;
    /**
     * Unique identifier of the delegate user who created the web resource.
     */
    readonly _createdonbehalfby_value: string;
    /**
     * Unique identifier of the user who last modified the web resource.
     */
    readonly _modifiedby_value: string;
    /**
     * Unique identifier of the delegate user who modified the web resource. 
     */
    readonly _modifiedonbehalfby_value: string;
    /**
     * Unique identifier of the organization associated with the web resource.
     */
    readonly _organizationid_value: string;
}

export type SingleValuedNavigationProperties = {
    ContentFileRef: FileAttachment;
    ContentJsonFileRef: FileAttachment;
    createdby: SystemUser;
    createdonbehalfby: SystemUser;
    modifiedby: SystemUser;
    modifiedonbehalfby: SystemUser;
    organizationid: Organization;
}

export type CollectionValuedNavigationProperties = {
    lk_theme_logoid: Theme;
    solution_configuration_webresource: Solution
    webresource_FileAttachments: FileAttachment;
    webresource_savedqueryvisualizations: SavedQueryVisualization;
    webresource_userqueryvisualizations: UserQueryVisualization;
}