const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

const execPromise = (command) => {
    const child = exec(command);
    const promise = new Promise((resolve, reject) => {
        child.addListener('error', reject);
        child.addListener('exit', resolve);
    });
    child.promise = promise;
    return child;
}

const update = async () => {
    await execPromise('npm install -g .').promise;
    if (process.platform === 'win32') {
        const dir = path.join(process.env.HOME, 'AppData', 'Roaming', 'npm');
        const ps1 = path.join(dir, 'xrm-cli.ps1');
        const cmd = path.join(dir, 'xrm-cli.cmd');

        await fs.rm(ps1);

        const script = await fs.readFile(cmd, 'ascii');
        const rewrite = script.replace(/"%dp0%\\node_modules\\xrm-cli\\dist\\src\\index.js"/g, 'node "%dp0%\\node_modules\\xrm-cli\\dist\\src\\index.js"');
        await fs.writeFile(cmd, rewrite);
    }
}

update();