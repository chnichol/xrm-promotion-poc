# xrm-cli/project

Example Dynamics project utilizing the xrm-cli toolkit. Based on the Sapling Tracking System project given to USDC Business Apps new hires as part of their ramp-up training.

---

## XRM Configuration

The `xrm-cli` is configured via the `xrm.json` file included in the root of this project. The schema is outlined below. **This schema is not finalized and likely to change!**

| Key                 | Description                                                          |
|---------------------|----------------------------------------------------------------------|
| aadClientId         | Client ID of the app registration being used for `xrm-cli`           |
| aadTenantId         | Tenant ID of the app registration being used for xrm-cli             |
| dynamics            | URL of the target dynamics instance                                  |
| solutions           | Solutions to include in the project                                  |
| pluginAssembliesDir | Location of plugin assembly .NET projects                            |
| webResourcesDir     | Location of web resource Node.JS projects                            |
| rootDir             | Folder to store XRM definitions                                      |
| systemFormFormat    | Format to use for forms, currently only `xml` is supported           |
| typesDir            | Folder to store generated types                                      |
| authHome            | URL the authentication app is being served at                        |
| authPort            | Port to use for communicating with the authentication app            |
| authRedirect        | URL the authentication app is expecting to receive the user token at |