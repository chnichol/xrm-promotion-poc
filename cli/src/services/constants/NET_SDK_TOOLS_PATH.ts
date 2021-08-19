import path from 'path';
import { FileQuickReader } from 'services';
import { Service, ServiceCollection } from 'services/serviceBuilder';

export default class NET_SDK_TOOLS_PATH implements Service<'NET_SDK_TOOLS_PATH', string> {
    public readonly name = 'NET_SDK_TOOLS_PATH';
    public init = (services: ServiceCollection) => {
        if (process.platform !== 'win32') {
            console.warn('.NET SDK Tools are only available on Windows');
            return '';
        }

        const fileQuickReader: FileQuickReader = services.get('FileQuickReader');
        const dir = path.join('/', 'Program Files (x86)', 'Microsoft SDKs', 'Windows', 'v10.0A', 'bin');
        const version = fileQuickReader.readDir(dir).sort((a, b) => {
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
    }
}