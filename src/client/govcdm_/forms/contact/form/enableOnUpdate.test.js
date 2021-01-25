import { XrmMockGenerator } from "xrm-mock";
import { enableOnUpdate } from "./enableOnUpdate";
const xml2js = require("xml2js");
const fs = require("fs");

describe("Email address form update", () => {
  // Applies only to tests in this describe block
  beforeAll(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.formContext.ui.formSelector.getCurrentItem().formType = 2;
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

  test("Expect formType to be Update (2)", () => {
    const fType = XrmMockGenerator.formContext.ui.formSelector.getCurrentItem()
      .formType;
    expect(fType).toBe(2);
  });

  test("Expect emailaddress1 to be enabled", () => {
    const executionContext = XrmMockGenerator.getEventContext();
    const fCon = executionContext.getFormContext();

    enableOnUpdate(executionContext);

    const emailCtrl = fCon.getControl("emailaddress1");
    expect(emailCtrl.getDisabled()).toBeFalsy();
  });
});

describe("Email address form create", () => {
  // Applies only to tests in this describe block
  beforeAll(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.formContext.ui.formSelector.getCurrentItem().formType = 1;
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

  test("Expect formType to be Create (1)", () => {
    const fType = XrmMockGenerator.formContext.ui.formSelector.getCurrentItem()
      .formType;
    expect(fType).toBe(1);
  });

  test("Expect emailaddress1 to be disabled", () => {
    const executionContext = XrmMockGenerator.getEventContext();
    const fCon = executionContext.getFormContext();

    enableOnUpdate(executionContext);

    const emailCtrl = fCon.getControl("emailaddress1");
    console.log("toBeTruthy emailaddress1: " + emailCtrl.getDisabled());
    expect(emailCtrl.getDisabled()).toBeTruthy();
  });
});
