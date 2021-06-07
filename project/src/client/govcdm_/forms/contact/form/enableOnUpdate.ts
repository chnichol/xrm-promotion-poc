import { pipe } from 'client/utility/pipe';
import { enableField } from 'client/control/enableField';
import { getFormContextControl } from 'client/control/getFormContextControl';
import { formTypeUpdateExecution } from 'client/form/formTypeUpdateExecution';

const enableOnUpdate = (execContext: any) => {
  debugger;
  const fCon = execContext.getFormContext();
  const getFConCtrl = getFormContextControl(fCon);
  const enableCtrlOnUpdate = formTypeUpdateExecution(fCon)(enableField);

  pipe(getFConCtrl, enableCtrlOnUpdate)('emailaddress1');
};

export { enableOnUpdate };
