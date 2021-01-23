const formTypeExecution =  (fType) => (fCon) => (func) => (arg) => (fCon.ui.getFormType() === fType && func(arg)) || arg;

export { formTypeExecution };
