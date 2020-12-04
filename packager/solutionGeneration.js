
const fse = require('fs-extra');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const parser = new xml2js.Parser({ async: false });

const folderPath = 'solution_components';
const entityPath = 'Entities';
const changesPath = 'changes';
const all_comp = process.env.all_comp && JSON.parse(process.env.all_comp) || [];

console.log(`Component folder: ${folderPath}`);
console.log(`All changed files: ${all_comp}`);

const component_filter = all_comp.filter(f=> f.match(folderPath));

fs.readdirSync(`${folderPath}/${entityPath}`)
  .filter((f) => component_filter.find((c) => c.match(`${folderPath}/${entityPath}/${f}`)))
  .map((f, i) => {
    fse.copySync(`${folderPath}/${entityPath}/${f}`, `${changesPath}/${entityPath}/${f}`);
  });

  fse.copySync(`${folderPath}/Other`, `${changesPath}/Other`);