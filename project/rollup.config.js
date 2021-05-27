import { findFiles, generateRollup } from './rollup.helpers'

const config = {
    distRoot: {
        build: './solution_components/WebResources',
        debug: './debug'
    },
    srcRoot: './src/client'
};

export default generateRollup(config, findFiles(config.srcRoot, /main.js/g));