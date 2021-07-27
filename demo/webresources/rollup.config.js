import { findFiles, generateRollup } from './rollup.helpers'

const config = {
    distRoot: {
        build: './dist',
        debug: './debug'
    },
    srcRoot: './src'
};

export default generateRollup(config, findFiles(config.srcRoot, /.*\.(js|ts)/g));