# xrm-cli/cli

Base toolkit that provides a unified interface to build Dynamics projects.

---

## Installing the CLI

The CLI should be installed as a global NPM package so it can be used without a `package.json` file and `node_modules` folder.

To install the CLI globally, navigate to the root repo folder and run the following command:

```
npm install -g ./cli
```

After installation, a few more steps need to be taken to fix the windows NPM runtime.

The first issue is that NPM PowerShell startup scripts are not signed and thus, by default, many systems will block their execution. We may be able to relax PowerShell security, but that's less than ideal and not always an option. Luckily there's an alternative: just delete the PowerShell startup script and force it to use the CMD startup script.

To delete the PowerShell startup script, run the following command:

```
rm C:\Users\[username]\AppData\Roaming\npm\xrm-cli.ps1
```

The second issue is that the scripts used to launch the CLI do not specify to run them using Node.JS and Windows, by default, runs them using JScript. To correct this issue, we need to edit the CMD startup script accordingly.

1. Open the CMD startup script in a text editor. The following command opens the script in Notepad:

```
notepad C:\Users\[username]\AppData\Roaming\npm\xrm-cli.cmd
```

2. Add `node ` to the beginning of line 4 so it reads as follows:

```
node "%dp0%\node_modules\xrm-cli\dist\index.js"   %*
```

3. Save and close Notepad

To verify the runtime is accessible, run the following command:

```
xrm-cli --help
```

If you see the help screen for xrm-cli, then you're good to go.

---

## Syntax

```
xrm-cli (action) [component-type] [...component-list]
```

### **Actions**
##### *Required*

| Action  | Description                                                 |
|---------|-------------------------------------------------------------|
| add     | Add new components and their backing projects               |
| build   | Build developer projects into deployable components         |
| list    | List components                                             |
| pull    | Download the latest component definitions from Dynamics     |
| push    | Upload the current, local component definitions to Dynamics |
| remove  | Remove components and their backing projects                |
| typegen | Generate code based on component definitions                |

### **Component Type**
##### *Optional*

Limit the action to only components of the given type. The help page of each action lists which components are able to execute that action.

### **Component List**
##### *Optional*

Limit the action to only components with the given names. All positional arguments after the component type are interpreted as part of the component list.

### **Options**

| Option  | Description           |
|---------|-----------------------|
| help    | Show help             |
| version | Show version number   |

---

## Development

The following commands assume your current directory is `[project]/cli`

### Initialize Project

Only needs to be ran after first pulling down the project.

```
npm install
```

### Build the Project

Required for changes to made available to the CLI instance being used by the example project.

```
npm run build
```