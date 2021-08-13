import { ChildProcess, exec } from 'child_process';
import fs from 'fs/promises';
import * as config from '../src/config/generators';

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
}