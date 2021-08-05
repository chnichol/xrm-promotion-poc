const { exec } = require('child_process');
const fs = require('fs/promises');

const execPromise = (command) => {
    const child = exec(command);
    const promise = new Promise((resolve, reject) => {
        child.addListener('error', reject);
        child.addListener('exit', resolve);
    });
    child.promise = promise;
    return child;
}

const build = async () => {
    // Do a first dependency install if needed.
    try {
        await fs.access('package-lock.json');
    }
    catch {
        await execPromise('npm install').promise;
    }

    // Build the application.
    await execPromise('tsc').promise;
}

build();