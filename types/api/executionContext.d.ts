import * as onChange from './events/onChange';
import * as onDataLoad from './events/onDataLoad';
import * as onGridDataLoad from './events/onGridDataLoad';
import * as onLoad from './events/onLoad';
import * as onLookupTagClick from './events/onLookupTagClick';
import * as onPostSearch from './events/onPostSearch';
import * as onProcessStatusChange from './events/onProcessStatusChange';
import * as onReadyStateComplete from './events/onReadyStateComplete';
import * as onRecordSelect from './events/onRecordSelect';
import * as onResultOpened from './events/onResultOpened';
import * as onSave from './events/onSave';
import * as onSelection from './events/onSelection';
import * as onStageChange from './events/onStageChange';
import * as onStageSelected from './events/onStageSelected';
import * as onTabStateChange from './events/onTabStateChange';
import * as preSearch from './events/preSearch';

/**
 * The execution context defines the event context in which your code executes.
 * 
 * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/execution-context docs.microsoft.com}
 */
export default interface ExecutionContext {
    /**
     * Returns a value that indicates the order in which this handler is executed. The order begins with 0.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getdepth docs.microsoft.com}
     */
    getDepth(): number;
    /**
     * Returns an object with methods to manage the events.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs docs.microsoft.com}
     */
    getEventArgs(): onChange.EventArgs
        | onDataLoad.EventArgs
        | onGridDataLoad.EventArgs
        | onLoad.EventArgs
        | onLookupTagClick.EventArgs
        | onPostSearch.EventArgs
        | onProcessStatusChange.EventArgs
        | onReadyStateComplete.EventArgs
        | onRecordSelect.EventArgs
        | onResultOpened.EventArgs
        | onSave.EventArgs
        | onSelection.EventArgs
        | onStageChange.EventArgs
        | onStageSelected.EventArgs
        | onTabStateChange.EventArgs
        | preSearch.EventArgs;
    /**
     * TODO: Update the return type to include the proper types once developed.
     * 
     * Returns a reference to the object that the event occurred on. 
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventsource docs.microsoft.com}
     */
    getEventSource(): any;
    /**
     * TODO: Update the return type to include the proper type once developed.
     * 
     * Returns a reference to the form or an item on the form depending on where the method was called.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext docs.microsoft.com}
     */
    getFormContext(): any;
    /**
     * Retrieves a variable set using the setSharedVariable method.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getsharedvariable docs.microsoft.com}
     * 
     * @param key The name of the variable.
     * @returns The specific type depends on what the value object is.
     */
    getSharedVariable(key: string): Object;
    /**
     * Sets the value of a variable to be used by a handler after the current handler completes.
     * 
     * See {@link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/setsharedvariable docs.microsoft.com}
     * 
     * @param key The name of the variable.
     * @param value The values to set.
     */
    setSharedVariable(key: string, value: Object): void;
}