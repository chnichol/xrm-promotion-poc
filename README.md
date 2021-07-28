# xrm-cli

Ecosystem for building Dynamics projects in a unified way.

## Project State

Currently this project is in early development (referred to as "Version 0" or "V0"). It should not be used on any production workloads.

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

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general). Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.