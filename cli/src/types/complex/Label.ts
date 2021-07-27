import LocalizedLabel from './LocalizedLabel';

/**
 * Contains a collection of translations for a label.
 * 
 * See {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/label?view=dynamics-ce-odata-9 docs.microsoft.com}
 */
type Label = {
    /** The collection of localized labels. */
    LocalizedLabels: LocalizedLabel[];
    /** The label for the language of the current user. */
    UserLocalizedLabel?: LocalizedLabel;
}

export default Label;