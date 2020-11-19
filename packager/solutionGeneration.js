
const fse = require('fs-extra');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const parser = new xml2js.Parser({ async: false });
console.log(typeof process.env.TEST);
const folderPath = 'solution_components';
const changesPath = 'changes';
const all_comp = process.env.all_comp && JSON.parse(process.env.all_comp) || [];

console.log(`Component folder: ${folderPath}`);
console.log(`All changed files: ${all_comp}`);

const component_filter = all_comp.filter(f=> f.match(folderPath));

console.log(`solution_component changes: ${component_filter}`);

fs.readdirSync(folderPath)
  .filter((f) => f === "Other" || component_filter.find((c) => c.match(`${folderPath}/${f}`)))
  .map((f, i) => {
    fse.copySync(`${folderPath}/${f}`, `${changesPath}/${f}`);
  });