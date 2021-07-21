import FormContext from '../formContext';

export default interface ExecutionContext<T extends FormContext> {
    getFormContext(): T;
}