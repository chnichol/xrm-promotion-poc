import { ChildProcess, exec } from 'child_process';
import fs from 'fs/promises';
import { parse } from 'jsonc-parser';
import path from 'path';
import * as config from '../src/services/config/generators';

type ChildProcessWithPromise = ChildProcess & {
    promise: Promise<unknown>;
}

const execPromise = (command: string) => {
    const child = exec(command) as ChildProcessWithPromise;
    const promise = new Promise((resolve, reject) => {
        child.addListener('error', reject);
        child.addListener('exit', resolve);
    });
    child.promise = promise;
    return child;
}

export const generate = async () => {
    await config.generateCode();
}

export const build = async () => {
    // Do a first dependency install if needed.
    try {
        await fs.access('package-lock.json');
    }
    catch {
        await execPromise('npm install').promise;
    }

    // Generate any code artifacts needed.
    await generate();

    // Build the application.
    await execPromise('tsc').promise;
    
    const tsconfig = parse(await fs.readFile('tsconfig.json', 'utf8'));
    
    // Delete the build scripts (need to figure out how to not build them in the first place).
    await fs.rm(path.join(tsconfig.compilerOptions.outDir, 'scripts'), {
        force: true,
        maxRetries: 10,
        recursive: true,
        retryDelay: 100
    });

    // Copy over files needed to do custom import paths.
    const tsconfigString = JSON.stringify({
        compilerOptions: {
            baseUrl: tsconfig.compilerOptions.baseUrl,
            paths: tsconfig.compilerOptions.paths
        }
    });
    await fs.writeFile(path.join(tsconfig.compilerOptions.outDir, 'tspaths.json'), tsconfigString);
    await fs.copyFile('tsregister.js', path.join(tsconfig.compilerOptions.outDir, 'tsregister.js'));
}