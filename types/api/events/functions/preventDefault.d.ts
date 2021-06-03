export default interface PreventDefault {
    /**
     * Cancels the save operation, but all remaining handlers for the event will still be executed.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/preventdefault docs.microsoft.com}
     */
    preventDefault(): void;
}