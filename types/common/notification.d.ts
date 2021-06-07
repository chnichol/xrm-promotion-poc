/**
 * @see https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-app/addglobalnotification
 */
export default interface Notification {
    action?: {
        /** The label for the action of the message. */
        actionLabel?: string;
        /** The function to execute when the action label is clicked. */
        eventHandler?: Function;
    };
    /**
     * Defines the level of notification. Valid values are:
     * 1. Success
     * 2. Error
     * 3. Warning
     * 4. Information
     */
    level: 1 | 2 | 3 | 4;
    /** The message to display in the notification. */
    message: string;
    /**
     * Indicates whether or not the user can close or dismiss the notification.
     * If you don't specify this parameter, users can't close or dismiss the notification by default.
     */
    showCloseButton?: boolean;
    /**
     * Defines the type of notification. Currently, only a value of 2 is supported,
     * which displays a message bar at the top of the app.
     */
    type: 2;
}