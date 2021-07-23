# xrm-cli/project

Example Dynamics project utilizing the xrm-cli toolkit. Based on the Sapling Tracking System project given to USDC Business Apps new hires as part of their ramp-up training.

---

## XRM Configuration

The `xrm-cli` is configured via the `xrm.json` file included in the root of this project. The schema is outlined below. **This schema is not finalized and likely to change!**

| Key                      | Description                                                                                                                           |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| auth                     | Properties needed for authenticating to Dynamics using user credentials                                                               |
| auth.authority           | Authentication URL of the Dynamics Azure AD tenant                                                                                    |
| auth.clientId            | Client ID of the app registration being used for `xrm-cli`                                                                            |
| dynamics                 | URL of the target dynamics instance                                                                                                   |
| project                  | Properties for locating certain project artifacts                                                                                     |
| project.forms            | Format to use for forms, currently only `xml` is supported                                                                            |
| project.pluginassemblies | Location of plugin assembly .NET projects                                                                                             |
| project.root             | Folder to store XRM definitions                                                                                                       |
| project.solutions        | Solutions to include in the project. Solutions are used as a whitelist for what solution components are allowed to be interacted with |
| project.types            | Folder to store generated types                                                                                                       |
| project.webresources     | Location of web resource Node.JS projects                                                                                             |
| urls                     | URL info to use for the self-hosted authentication app                                                                                |
| urls.home                | URL the authentication app is being served at                                                                                         |
| urls.port                | Port to use for communicating with the authentication app                                                                             |
| urls.redirect            | URL the authentication app is expecting to receive the user token at                                                                  |