
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const parser = new xml2js.Parser({ async: false });
console.log(process.ENV.CRM_CONN);
const folderPath = '../solution_components';

const component_filter = fs.readdirSync(folderPath)
    .filter(f => f === 'Other')
    .map(dir => fs.readdirSync(path.join(folderPath, dir))
        .filter(f => f.match(/solution/i))
        .map(f => fs.readFileSync(path.join(folderPath, dir, f), 'utf-8'))
    );

console.log(component_filter);
const all_components = fs.readdirSync(folderPath)
    .map(file => console.log(file));
