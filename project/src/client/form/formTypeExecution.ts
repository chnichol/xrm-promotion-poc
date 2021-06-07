const formTypeExecution =  (fType: any) => (fCon: any) => (func: any) => (arg: any) => (fCon.ui.getFormType() === fType && func(arg)) || arg;

export { formTypeExecution };
