# xrm-cli

Ecosystem for building Dynamics projects in a unified way.

## Dependencies

This project uses a few different tools.

Plugin assemblies are required to be given a strong name. the current tool for this, `sn.exe`, is only available for Windows. If you are not building plugins however, you may use Max OSX or Linux as both Node.JS and the .NET SDK are available cross platform.

### [Node.JS](https://nodejs.org/en/) (I recommend installing LTS)

- Building and running the CLI
- Building web resource projects

### [.NET SDK](https://docs.microsoft.com/en-us/dotnet/core/sdk)

- Building plugin assembly projects

### [.NET Framework Tools](https://docs.microsoft.com/en-us/dotnet/framework/tools/) (`xrm-cli` will automatically use the latest version you have installed)
##### ***WINDOWS ONLY***

- Signing plugin assembly DLL's for consumption by Dynamics