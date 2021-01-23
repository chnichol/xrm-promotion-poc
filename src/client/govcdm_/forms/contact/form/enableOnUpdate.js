import { pipe } from "../../../../utility/pipe";
import { enableField } from "../../../../control/enableField";
import { getFormContextControl } from "../../../../control/getFormContextControl";
import { formTypeUpdateExecution } from "../../../../form/formTypeUpdateExecution";

const enableOnUpdate = (execContext) => {
  debugger;
  const fCon = execContext.getFormContext();
  const getFConCtrl = getFormContextControl(fCon);
  const enableCtrlOnUpdate = formTypeUpdateExecution(fCon)(enableField);

  pipe(getFConCtrl, enableCtrlOnUpdate)("emailaddress1");
};

export { enableOnUpdate };
