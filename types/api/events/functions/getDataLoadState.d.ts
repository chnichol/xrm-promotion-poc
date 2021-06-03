export default interface GetDataLoadState {
    /**
     * Gets the state of the data load.
     * 
     * See: {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs docs.microsoft.com}
     * 
     * @returns
     * 1. Initial Load
     * 2. Save
     * 3. Refresh
     */
    getDataLoadState(): 1 | 2 | 3;
}