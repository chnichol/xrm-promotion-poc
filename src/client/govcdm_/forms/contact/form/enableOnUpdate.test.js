import { XrmMockGenerator } from "xrm-mock";
import { enableOnUpdate } from "./enableOnUpdate";
const xml2js = require("xml2js");
const fs = require("fs");

beforeAll(()=>{
  XrmMockGenerator.initialise();

  const xml = fs.readFileSync(
    "solution_components/Entities/Contact/FormXml/main/{1fed44d1-ae68-4a41-bd2b-f13acac4acfa}.xml",
    {
      encoding: "UTF-8",
    }
  );

  return xml2js.parseStringPromise(xml).then((result) => {
    result.forms.systemform[0].form[0].tabs[0].tab.map((t) =>
      t.columns[0].column.map((c) =>
        c.sections[0].section.map((s) =>
          s.rows[0].row
            .filter((r) => r.cell)
            .map((r) =>
              r.cell.map((cell) =>
                cell.control
                  .filter((ctrl) => ctrl.$.datafieldname)
                  .map((ctrl) =>
                    XrmMockGenerator.Attribute.createString(
                      {
                        name: ctrl.$.datafieldname,
                      },
                      [
                        {
                          disabled: JSON.parse(ctrl.$.disabled),
                        },
                      ]
                    )
                  )
              )
            )
        )
      )
    );
  });
});

test('Expect emailaddress1 to be enabled', () => {
    XrmMockGenerator.formContext.ui.formSelector.getCurrentItem().formType = 2;

    const executionContext = XrmMockGenerator.getEventContext();
    const fCon = executionContext.getFormContext();

    enableOnUpdate(executionContext);

    const emailCtrl = fCon.getControl("emailaddress1");
    expect(emailCtrl.getDisabled()).toBeFalsy();
  });

  test('Expect emailaddress1 to be disabled', () => {
      XrmMockGenerator.formContext.ui.formSelector.getCurrentItem().formType = 1;
  
      const executionContext = XrmMockGenerator.getEventContext();
      const fCon = executionContext.getFormContext();
  
      enableOnUpdate(executionContext);
  
      const emailCtrl = fCon.getControl("emailaddress1");
      expect(emailCtrl.getDisabled()).toBeTruthy();
    });