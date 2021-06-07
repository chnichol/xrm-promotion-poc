export default interface IsDefaultPrevented {
    /**
     * Returns a value indicating whether the save event has been canceled
     * because the preventDefault method was used in this event handler or a previous event handler.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/isdefaultprevented docs.microsoft.com}
     */
    isDefaultPrevented(): boolean;
}