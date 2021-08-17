import { ChildProcess, exec } from 'child_process';
import fs from 'fs/promises';
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

    // Copy over files needed to do custom import paths.
    // await fs.copyFile('tsconfig.json', path.join('dist', 'tsconfig.json'));
    // await fs.copyFile('tsregister.js', path.join('dist', 'tsregister.js'));
}