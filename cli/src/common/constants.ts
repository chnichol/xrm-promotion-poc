import fs from 'fs';
import path from 'path';

export const ILMERGE_PATH: string = (() => {
    if (process.platform !== 'win32') {
        console.warn('.NET SDK Tools are only available on Windows');
        return '';
    }
    const dir = `${process.env.USERPROFILE}/.nuget/packages/ilmerge`;
    try {
        const version = fs.readdirSync(dir).sort((a, b) => {
            const [aMajor, aMinor, aPatch] = a.split('.').map(s => Number.parseInt(s));
            const [bMajor, bMinor, bPatch] = b.split('.').map(s => Number.parseInt(s));
            
            const compareMajor = bMajor - aMajor;
            if (compareMajor) {
                return compareMajor;
            }
    
            const compareMinor = bMinor - aMinor;
            if (compareMinor) {
                return compareMinor;
            }
    
            return bPatch - aPatch;
        })[0];
        const exe = `${dir}/${version}/tools/net452/ILMerge.exe`;
        return exe;
    }
    catch {
        return dir;
    }
})();

export const NET_SDK_TOOLS_PATH: string = (() => {
    if (process.platform !== 'win32') {
        console.warn('.NET SDK Tools are only available on Windows');
        return '';
    }
    const dir = path.join('/', 'Program Files (x86)', 'Microsoft SDKs', 'Windows', 'v10.0A', 'bin');
    const version = fs.readdirSync(dir).sort((a, b) => {
        // Folder names follow the naming convention of NETFX [major].[minor].[patch] Tools
        const aVersion = a.split(' ')[1];
        const bVersion = b.split(' ')[1];

        const [aMajor, aMinor, aPatch] = aVersion.split('.').map(s => Number.parseInt(s));
        const [bMajor, bMinor, bPatch] = bVersion.split('.').map(s => Number.parseInt(s));
        
        const compareMajor = (bMajor ?? 0) - (aMajor ?? 0);
        if (compareMajor) {
            return compareMajor;
        }

        const compareMinor = (bMinor ?? 0) - (aMinor ?? 0);
        if (compareMinor) {
            return compareMinor;
        }

        return (bPatch ?? 0) - (aPatch ?? 0);
    })[0];
    return path.join(dir, version);
})();

export const NET_SDK_TOOLS_SN_PATH = path.join(NET_SDK_TOOLS_PATH, 'sn.exe');