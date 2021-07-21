import { SizeValue } from './size';

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
type NavigationOptions = InlineNavigationOptions | DialogNavigationOptions;
export default NavigationOptions;

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export interface InlineNavigationOptions {
    /**
     * 1. Open the page inline
     * 2. Open the page in a dialog
     * 
     * Entity lists can only be opened inline; entity records and web resources can be opened either inline or in a dialog.
     */
    target: 1;
}

/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/navigateto
 */
export interface DialogNavigationOptions {
    /**
     * 1. Open the page inline
     * 2. Open the page in a dialog
     * 
     * Entity lists can only be opened inline; entity records and web resources can be opened either inline or in a dialog.
     */
    target: 2;
    /** The width of the dialog. */
    width: number | SizeValue;
    /** The height of the dialog. */
    height: number | SizeValue;
    /**
     * 1. Open the dialog in the center.
     * 2. Open the dialog on the side.
     */
    position: 1 | 2;
    /** The dialog title on top of the center or side dialog. */
    title: string;
}