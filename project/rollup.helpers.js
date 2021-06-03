import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import strip from "rollup-plugin-strip";
import alias from "rollup-plugin-alias";
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import path from 'path';

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1);

export const findFiles = (dirname, pattern) => {
    const results = [];
    fs.readdirSync(dirname).forEach(p => {
        const filePath = path.join(dirname, p);
        if (fs.lstatSync(filePath).isDirectory()) {
            findFiles(filePath, pattern).forEach(f => results.push(f));
        }
        else if (pattern.test(path.basename(filePath)) || pattern.test(path.normalize(filePath))) {
            results.push(filePath);
        }
    });
    return results;
};

export const generateName = (config, filename) => path
    .relative(path.normalize(config.srcRoot), path.normalize(filename)) // Get the file path relative to the source directory
    .split(/\\|\//g)                                                    // Split apart the path components
    .filter(s => !!s)                                                   // Remove any empty path sections
    .map((f, i, a) => ({                                                // Camel case the path components
        0: f.toLowerCase(),                                             // First component is lower case
        [a.length - 1]: capitalize(f.split('.')[0])                     // Last component is upper case sans file extension
    }[i] ?? capitalize(f)))                                             // Middle components are upper case
    .join('');                                                          // Recombine path components

/** Generate the build path by mapping the source file to the build directory. */
export const generateBuildPath = (config, filename) => path.join(
    config.distRoot.build,
    path.relative(
        path.normalize(config.srcRoot),
        path.normalize(filename).replace(/\.ts/g, '.js')
    )
);

/** 
 * Generate the debug path by mapping the srouce file to the debug directory
 * and inserting "debug" in the extension path.
 */
export const generateDebugPath = (config, filename) => path.join(
    config.distRoot.debug,
    path.relative(
        path.normalize(config.srcRoot),
        path.normalize(filename
            .split(/\\|\//g)
            .filter(s => !!s)
            .map((f, i, a) => i === a.length - 1
                ? f.split('.')[0] + '.debug.' + f.split('.', 2)[1].replace(/ts/g, 'js')
                : f
            )
            .join(path.sep)
        )
    )
);

/** Generate a rollup entry for the build file. */
export const generateBuildRollup = (config, filename) => ({
    input: filename,
    output: {
        file: generateBuildPath(config, filename),
        name: generateName(config, filename),
        format: 'iife',
        sourcemap: false
    },
    plugins: [
        alias({
            debug: 'node_modules/debug/dist/debug.js'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        (path.extname(filename) === '.ts' ? typescript() : commonjs()),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        strip(),
        terser()
    ],
    external: ['debug']
});

/** Generate a rollup entry for the debug file. */
export const generateDebugRollup = (config, filename) => ({
    input: filename,
    output: {
        file: generateDebugPath(config, filename),
        name: generateName(config, filename),
        format: 'iife',
        sourcemap: 'inline'
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        (path.extname(filename) === '.ts' ? typescript() : commonjs()),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
    external: ['debug']
});

/**
 * Generates rollup configuration entries for a given source file.
 */
export const generateFileRollup = (config, filename) => [
    generateBuildRollup(config, filename),
    generateDebugRollup(config, filename)
];

/**
 * Generate rollup configuration entries for a list of files.
 */
export const generateRollup = (config, filelist) => filelist.flatMap(f => generateFileRollup(config, f));