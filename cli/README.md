# xrm-cli/cli

Base toolkit that provides a unified interface to build Dynamics projects.

---

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

## Installing the CLI

##### *These steps will need to be performed any time you are updating the CLI.*

Because of some cleanup steps required after installing the `xrm-cli` as a global module, an update script has been provided. To execute it, simply run the following command in the cli directory:

```
npm run update
```

This will install the xrm-cli as a global utility which can then be accessed by entering `xrm-cli` in the command line.

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