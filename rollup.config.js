import { generateRollup } from './rollup.helpers'

const config = {
    distRoot: {
        build: './solution_components/WebResources',
        debug: './debug'
    },
    srcRoot: './src/client'
};

const files = [
    './src/client/govcdm_/forms/contact/main.js'
];

export default generateRollup(config, files);