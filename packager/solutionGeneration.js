const fse = require("fs-extra");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");
const parser = new xml2js.Parser({ async: false });

const changesPath = "changes";
const all_comp =
  (process.env.all_comp && JSON.parse(process.env.all_comp)) || [];

const folderPath = "solution_components";
const appModulesPath = "AppModules";
const canvasAppsPath = "CanvasApps";
const entitiesPath = "Entities";
const interactionCentricDashboardsPath = "InteractionCentricDashboards";
const optionSetsPath = "OptionSets";
const otherPath = "Other";
const rolesPath = "Roles";
const pluginAssembliesPath = "PluginAssemblies";
const sdkMessageProcessingStepsPath = "SdkMessageProcessingSteps";
const webResourcesPath = "WebResources";
const workflowsPath = "Workflows";

/*

const component_dir_map = {};
component_dir_map[appModulesPath] = (dir) =>
  dir.split("/").slice(0, 3).join("/");

component_dir_map[canvasAppsPath] = (dir) => {};
component_dir_map[entitiesPath] = (dir) => {};
component_dir_map[interactionCentricDashboardsPath] = (dir) => {};
component_dir_map[optionSetsPath] = (dir) => {};
component_dir_map[otherPath] = (dir) => {};
component_dir_map[rolesPath] = (dir) => {};
component_dir_map[pluginAssembliesPath] = (dir) => {};
component_dir_map[sdkMessageProcessingStepsPath] = (dir) => {};
component_dir_map[webResourcesPath] = (dir) => {};
component_dir_map[workflowsPath] = (dir) => {};
*/

const component_filter_map = {};
component_filter_map[appModulesPath] = (dir) => {
  console.log(`processing appmodule path ${dir}`);
  fse.copySync(
    dir.split("/").slice(0, 3).join("/"),
    `${changesPath}/${appModulesPath}/${dir.split("/")[2]}`
  );
};
component_filter_map[canvasAppsPath] = (dir) => {
  console.log(`processing canvasApp path ${dir}`);
  if (dir.match(/\.meta\.xml/i)) {
    const filePath = dir.split("/").slice(0, 2).join("/");
    const fileName = path.basename(dir).replace(/\.meta\.xml/, "");

    fse.copySync(
      `${path.join(filePath, fileName + ".meta.xml")}`,
      `${changesPath}/${canvasAppsPath}/${fileName + ".meta.xml"}`
    );
    fse.copySync(
      `${path.join(filePath, fileName + "_BackgroundImageUri")}`,
      `${changesPath}/${canvasAppsPath}/${fileName + "_BackgroundImageUri"}`
    );
    fse.copySync(
      `${path.join(filePath, fileName + "_DocumentUri.msapp")}`,
      `${changesPath}/${canvasAppsPath}/${fileName + "_DocumentUri.msapp"}`
    );
  }
};
component_filter_map[entitiesPath] = (dir) => {
  console.log(`processing entity path ${dir}`);

  const entityDirArr = dir.split("/").slice(0, 3);
  const enttiyDirPath = entityDirArr.join("/");
  const entDir = dir.split("/")[2];

  fse
    .readdirSync(enttiyDirPath)
    .filter((p) => !p.match(/Attributes/) && !p.match(/Entity.xml/))
    .map((p) => {
      fse.copySync(
        [...entityDirArr, p].join("/"),
        `${changesPath}/${entitiesPath}/${entDir}/${p}`
      );
    });


};
component_filter_map[interactionCentricDashboardsPath] = (dir) => {
  console.log(`processing interactionCentricDashboard path ${dir}`);
  fse.copySync(
    dir,
    `${changesPath}/${interactionCentricDashboardsPath}/${dir.split("/")[2]}`
  );
};
component_filter_map[optionSetsPath] = (dir) => {
  console.log(`processing optionSet path ${dir}`);
  fse.copySync(dir, `${changesPath}/${optionSetsPath}/${dir.split("/")[2]}`);
};
component_filter_map[otherPath] = (dir) => {
  console.log(`processing other path ${dir}`);
  if (!dir.match(/solution\.xml/i) && !dir.match(/customizations\.xml/i)) {
    fse.copySync(dir, `${changesPath}/${otherPath}/${dir.split("/")[2]}`);
  }
};
component_filter_map[rolesPath] = (dir) => {
  console.log(`processing role path ${dir}`);
  fse.copySync(dir, `${changesPath}/${rolesPath}/${dir.split("/")[2]}`);
};
component_filter_map[pluginAssembliesPath] = (dir) => {
  console.log(`processing pluginAssembly path ${dir}`);
  if (!dir.match(/\.data\.xml/i)) {
    const basePath = dir.split("/").slice(0, 2).join("/");
    const assemblyPath = dir.split("/")[2];
    const fileName = path.parse(path.basename(dir)).name;

    fse.copySync(
      dir,
      `${changesPath}/${pluginAssembliesPath}/${assemblyPath}/${
        fileName + ".dll"
      }`
    );
    fse.copySync(
      `${basePath}/${assemblyPath}/${fileName + ".dll.data.xml"}`,
      `${changesPath}/${pluginAssembliesPath}/${assemblyPath}/${
        fileName + ".dll.data.xml"
      }`
    );
  }
};
component_filter_map[sdkMessageProcessingStepsPath] = (dir) => {
  console.log(`processing sdkMessageProcessingStep path ${dir}`);
  fse.copySync(
    dir,
    `${changesPath}/${sdkMessageProcessingStepsPath}/${dir.split("/")[2]}`
  );
};
component_filter_map[webResourcesPath] = (dir) => {
  console.log(`processing webResource path ${dir}`);
  if (!dir.match(/\.data\.xml/i)) {
    const fileName = path.basename(dir);
    const compPath = dir.split("/").slice(2).join("/");

    fse.copySync(dir, `${changesPath}/${webResourcesPath}/${compPath}`);
    fse.copySync(
      dir + ".data.xml",
      `${changesPath}/${webResourcesPath}/${compPath + ".data.xml"}`
    );
  }
};
component_filter_map[workflowsPath] = (dir) => {
  console.log(`processing workflow path ${dir}`);
  if (!dir.match(/\.data\.xml/i)) {
    const fileName = path.basename(dir);

    fse.copySync(dir, `${changesPath}/${workflowsPath}/${fileName}`);
    fse.copySync(
      dir + ".data.xml",
      `${changesPath}/${workflowsPath}/${fileName + ".data.xml"}`
    );
  }
};

console.log(`Component folder: ${folderPath}`);
console.log(`All changed files: ${all_comp}`);

all_comp
  .map(f=>f.match(`${folderPath}/${entitiesPath}`) && f.split('/').slice(0,3).join('/') || f)
  .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
  .filter((f) => f.match(folderPath))
  .map((f) => {
    const compType = f.split("/")[1];
    component_filter_map[compType] && component_filter_map[compType](f);
  });

fse.copySync(
  path.join(folderPath, otherPath, "Customizations.xml"),
  path.join(changesPath, otherPath, "Customizations.xml")
);
