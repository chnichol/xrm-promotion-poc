export default interface GetSaveMode {
    /**
     * See: {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/getsavemode docs.microsoft.com}
     * 
     * Returns | Save Mode         | Table
     * :-----: | :---------------- | :------------------------
     * 1       | Save              | All                      
     * 2       | Save and Close    | All                      
     * 5       | Deactivate        | All                      
     * 6       | Reactivate        | All                      
     * 7       | Send              | Email                    
     * 15      | Disqualify        | Lead                     
     * 16      | Qualify           | Lead                     
     * 47      | Assign            | User or Team owned tables
     * 58      | Save as Completed | Activities               
     * 59      | Save and New      | All                      
     * 70      | Auto Save         | All                      
     */
    getSaveMode(): 1 | 2 | 5 | 6 | 7 | 15 | 16 | 47 | 58 | 59 | 70;
}