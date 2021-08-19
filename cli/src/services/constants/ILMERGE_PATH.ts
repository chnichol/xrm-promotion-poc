import path from 'path';
import { FileQuickReader } from 'services';
import { Service, ServiceCollection } from 'services/serviceBuilder';

export default class ILMERGE_PATH implements Service<'ILMERGE_PATH', string> {
    public readonly name = 'ILMERGE_PATH';
    public init = (services: ServiceCollection) => {
        if (process.platform !== 'win32') {
            console.warn('.NET SDK Tools are only available on Windows');
            return '';
        }
        const fileQuickReader: FileQuickReader = services.get('FileQuickReader');
        const dir = `${process.env.USERPROFILE}/.nuget/packages/ilmerge`;
        try {
            const version = fileQuickReader.readDir(dir).sort((a, b) => {
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
            const exe = path.join(dir, version, 'tools', 'net452', 'ILMerge.exe');
            return exe;
        }
        catch {
            return dir;
        }
    }
}