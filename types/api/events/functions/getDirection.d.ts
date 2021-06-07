export default interface GetDirection {
    /**
     * Gets the direction of the stage advance action.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs docs.microsoft.com}
     */
    getDirection(): 'Next' | 'Previous';
}