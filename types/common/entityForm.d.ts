import Lookup from './lookup';
import Relationship from './relationship';

export type EntityFormOptions = FormOptions | QuickCreateOptions;

interface EntityFormOptionsBase {
    /** Logical name of the table to display the form for. */
    entityName: string;
    /** ID of the table record to display the form for. */
    entityId?: string;
    /** ID of the form instance to be displayed. */
    formId?: string;
    /**
     * Indicates whether to display the command bar.
     * @default true
     */
    cmdbar?: boolean;
    /** Designates a record that will provide default values based on mapped column values. */
    createFromEntity?: Lookup;
    /** Height of the form window to be displayed in pixels. */
    height?: number;
    /**
     * Controls whether the navigation bar is displayed and whether application navigation is available using the areas and subareas defined in the sitemap.
     * - on: The navigation bar is displayed.
     * - off: The navigation bar is not displayed. People can navigate using other user interface elements or the back and forward buttons.
     * - entity: On a form, only the navigation options for related tables are available. After navigating to a related table, a back button is displayed in the navigation bar to allow returning to the original record.
     * @default "on"
     */
    navbar?: 'on' | 'off' | 'entity';
    /**
     * Indicates whether to display form in a new window or a new tab.
     * If you specify true and do not specify values for height or width, the form will display in a new tab.
     * Opening a form in a new window or a new tab makes the rendering of the form slow compared to opening the form on the same tab;
     * consider opening a form in the main form dialog instead.
     */
    openInNewWindow?: boolean;
    /**
     * Specify one of the following values for the position of the form on the screen:
     * - 1: center
     * - 2: side
     */
    windowPosition?: 1 | 2;
    /** Define a relationship object to display the related records on the form. */
    relationship?: Relationship;
    /** ID of the selected stage in business process instance. */
    selectedStageId?: string;
    /** Width of the form window to be displayed in pixels. */
    width?: number;
}

export interface FormOptions extends EntityFormOptionsBase {
    /**
     * Indicates whether to open a quick create form.
     * The table must have the Allow Quick Create option enabled for the quick create form to be displayed
     * and you must also add the table and the quick create form to your app.
     * @default false
     */
    useQuickCreateForm?: false;
}

export interface QuickCreateOptions extends EntityFormOptionsBase {
    /**
     * Indicates whether to open a quick create form.
     * The table must have the Allow Quick Create option enabled for the quick create form to be displayed
     * and you must also add the table and the quick create form to your app.
     */
    useQuickCreateForm: true;
}