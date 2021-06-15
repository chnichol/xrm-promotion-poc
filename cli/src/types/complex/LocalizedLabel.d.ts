/**
 * Contains a localized label, including the label string and the language code.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/localizedlabel?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type LocalizedLabel = {
    /** The localized label string. */
    Label: string;
    /** THe language code for the label. */
    LanguageCode: number;
    /** Whether the label is managed. */
    IsManaged: boolean;
    /** A unique identifier for the metadata item. */
    MetadataId: string;
    /** Whether the item of metadata has changed. */
    HasChanged: boolean;
}

export default LocalizedLabel;