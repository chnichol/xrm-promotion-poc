
const fse = require('fs-extra');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const parser = new xml2js.Parser({ async: false });
<<<<<<< Updated upstream
console.log(typeof process.env.TEST);
const folderPath = '../solution_components';
=======
const folderPath = 'solution_components';
const artifactsPath = 'artifacts';
const all_comp = JSON.parse(process.env.all_comp);
const spread = JSON.parse(process.env.SPREAD);
>>>>>>> Stashed changes

console.log(`Component folder: ${folderPath}`);
console.log(`All changed files: ${process.env.all_comp}`);

const component_filter = all_comp.filter(f=> f.match(folderPath));

console.log(`solution_component changes: ${component_filter}`);
console.log(`solution spread ${spread}`);

fs.readdirSync(folderPath)
  .filter((f) => {
        if(!spread && f === "Other" || (f !== "Other" &&
          component_filter.find((c) => c.match(`${folderPath}/${f}`))))
          return f;

  })
  .map((f, i) => {
    fse.copySync(`${folderPath}/${f}`, `${artifactsPath}/_${spread && i || 0}/${f}`);
    spread && fse.copySync(`${folderPath}/Other`, `${artifactsPath}/_${i}/Other`);
  });