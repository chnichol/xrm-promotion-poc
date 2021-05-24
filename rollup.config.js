import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import strip from "rollup-plugin-strip";
import alias from "rollup-plugin-alias";
import path from 'path';
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