import { XrmMockGenerator } from "xrm-mock";
import { clearFutureDate } from "./clearFutureDate";

beforeAll(()=>{
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const nextYear = new Date(year + 1, month, day);
    const lastYear = new Date(year - 1, month, day);

    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createDate("futureDateField", nextYear);
    XrmMockGenerator.Attribute.createDate("pastDateField", lastYear);
});

test('Expect Field to be null', () => {
    const executionContext = XrmMockGenerator.getEventContext();
    const fCon = executionContext.getFormContext();
    const attr = fCon.getAttribute("futureDateField");

    clearFutureDate(attr);

    expect(attr.getValue()).toBeFalsy();
  });

  test('Expect Field not to be null', () => {
      const executionContext = XrmMockGenerator.getEventContext();
      const fCon = executionContext.getFormContext();
      const attr = fCon.getAttribute("pastDateField");
  
      clearFutureDate(attr);
  
      expect(attr.getValue()).toBeTruthy();
    });