export interface AlertStrings {
    /** The confirm button label. If you do not specify the button label, OK is used as the button label. */
    confirmButtonLabel?: string;
    /** The message to be displayed in the alert dialog. */
    text: string;
    /** The title of the alert dialog. */
    title?: string;
}

export interface ConfirmStrings {
    /** The cancel button label. If you do not specify the cancel button label, Cancel is used as the button label. */
    cancelButtonLabel?: string;
    /** The confirm button label. If you do not specify the confirm button label, OK is used as the button label. */
    confirmButtonLabel?: string;
    /** The subtitle to be displayed in the confirmation dialog. */
    subtitle?: string;
    /** The message to be displayed in the confirmation dialog. */
    text: string;
    /** The title to be displayed in the confirmation dialog. */
    title?: string;
}

export interface ConfirmResponse {
    /** Indicates whether the confirm button was clicked to close the dialog. */
    confirmed: boolean;
}

export type ErrorOptions = {
    /**
     * Details about the error. When you specify this, the Download Log File button is available in the error message,
     * and clicking it will let users download a text file with the content specified in this value.
     */
    details?: string;
    /**
     * he error code. If you just set errorCode, the message for the error code is automatically retrieved from the server and displayed in the error dialog.
     * If you specify an invalid errorCode value, an error dialog with a default error message is displayed.
     */
    errorCode: number;
    /** The message to be displayed in the error dialog. */
    message?: string;
} | {
    /**
     * Details about the error. When you specify this, the Download Log File button is available in the error message,
     * and clicking it will let users download a text file with the content specified in this value.
     */
    details?: string;
    /**
     * he error code. If you just set errorCode, the message for the error code is automatically retrieved from the server and displayed in the error dialog.
     * If you specify an invalid errorCode value, an error dialog with a default error message is displayed.
     */
    errorCode?: number;
    /** The message to be displayed in the error dialog. */
    message: string;
}