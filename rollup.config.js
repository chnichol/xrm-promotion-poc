import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import strip from "rollup-plugin-strip";
import alias from "rollup-plugin-alias";
import { eslint } from "rollup-plugin-eslint";

export default [
    {
        input: './src/client/govcdm_/forms/contact/main.js',
        output: {
            file: 'solution_components/WebResources/govcdm_/forms/contact/main.js',
            name: 'hppAdminForm',
            format: 'iife',
            sourcemap: false
        },
        plugins: [
            alias({
                debug: 'node_modules/debug/dist/debug.js',
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            strip(),
            terser()
        ],
        external: ['debug']
    },
    {
        input: './src/client/govcdm_/forms/contact/main.js',
        output: {
            file: 'debug/govcdm_/forms/contact/main.debug.js',
            name: 'hppAdminForm',
            format: 'iife',
            sourcemap: 'inline'
        },
        plugins: [
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            replace({
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
        ],
        external: ['debug']
    }
];
