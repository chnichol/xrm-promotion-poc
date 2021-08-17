const path = require('path');
const tsConfig = require('./tspaths.json');
const tsConfigPaths = require('tsconfig-paths');

const { baseUrl, paths } = tsConfig.compilerOptions;
const outDir = path.relative(process.cwd(), __dirname).replace(/\\/g, '/');
const outDirPaths = Object.entries(paths).reduce(
  (outDirPaths, [k, v]) => Object.assign(
    outDirPaths,
    { [k]: v.map(path => path.replace(/^src\//, `${outDir}/src/`)) }
  ),
  {}
);

tsConfigPaths.register({ baseUrl, paths: outDirPaths });