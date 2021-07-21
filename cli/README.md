# xrm-cli/cli

Base toolkit that provides a unified interface to build Dynamics projects.

## Syntax

```
xrm-cli (action) [component-type] [...component-list]
```
---

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

---

### **Component Type**
##### *Optional*

Limit the action to only components of the given type. The help page of each action lists which components are able to execute that action.

---

### **Component List**
##### *Optional*

Limit the action to only components with the given names. All positional arguments after the component type are interpreted as part of the component list.

---

### **Options**

| Option  | Description           |
|---------|-----------------------|
| help    | Show help             |
| version | Show version number   |