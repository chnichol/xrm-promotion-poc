import Lookup from "../../../common/lookup";

export default interface GetTagValue {
    /**
     * Gets the selected tag value.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs docs.microsoft.com}
     */
    getTagValue(): Lookup[];
}