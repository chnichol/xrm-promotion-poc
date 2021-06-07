import Stage from "../../../common/stage";

export default interface GetStage {
    /**
     * Gets the stage object corresponding to the event triggered.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs docs.microsoft.com}
     */
    getState(): Stage;
}