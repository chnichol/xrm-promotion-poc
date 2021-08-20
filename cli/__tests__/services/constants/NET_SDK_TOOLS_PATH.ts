import path from 'path';
import services, { init } from 'services';
import { NET_SDK_TOOLS_PATH } from 'services/constants';
import ServiceBuilder, { Service, EmptyServiceCollection } from 'services/serviceBuilder';

const _process = process;
const sdkdir = path.join('/', 'Program Files (x86)', 'Microsoft SDKs', 'Windows', 'v10.0A', 'bin');

describe('services/constants/NET_SDK_TOOLS_PATH', () => {
    beforeAll(() => {
        process = {
            ...process,
            platform: process.platform
        };
    });

    it('can create the service with no parameters', () => {
        const service = new NET_SDK_TOOLS_PATH();
        expect(service.name).toStrictEqual('NET_SDK_TOOLS_PATH');
        expect(service.init).toBeDefined();
    });
    
    it('can find the path to .NET SDK tools', () => {
        process.platform = 'win32';

        class MockFileQuickReader implements Service<'FileQuickReader', MockFileQuickReader> {
            readonly name = 'FileQuickReader';
            init = () => new MockFileQuickReader();
            readDir = (dir: string) => dir === sdkdir ? [ 'NETFX 1.2.3 Tools' ] : []; 
        }
        init(
            ServiceBuilder.create()
                .addSingleton(MockFileQuickReader)
                .addSingleton(NET_SDK_TOOLS_PATH)
                .services
        );

        const result = services('NET_SDK_TOOLS_PATH');
        expect(result).toStrictEqual(path.join(sdkdir, 'NETFX 1.2.3 Tools'));
    });

    it('can pick the most recent versions when multiple are available', () => {
        process.platform = 'win32';

        class MockFileQuickReader implements Service<'FileQuickReader', MockFileQuickReader> {
            readonly name = 'FileQuickReader';
            init = () => new MockFileQuickReader();
            readDir = (dir: string) => dir === sdkdir ? [ 'NETFX 1.3.5 Tools', 'NETFX 3.2.1 Tools' ] : []; 
        }
        init(
            ServiceBuilder.create()
                .addSingleton(MockFileQuickReader)
                .addSingleton(NET_SDK_TOOLS_PATH)
                .services
        );

        const result = services('NET_SDK_TOOLS_PATH');
        expect(result).toStrictEqual(path.join(sdkdir, 'NETFX 3.2.1 Tools'));
    });

    it('cannot resolve when running on non-windows platforms', () => {
        process.platform = 'aix';
        expect(() => new NET_SDK_TOOLS_PATH().init(new EmptyServiceCollection())).toThrow('.NET SDK Tools are only available on Windows');
    });

    it('cannot resolve when .NET SDK tools are not installed', () => {
        process.platform = 'win32';
        expect(() => new NET_SDK_TOOLS_PATH().init(new EmptyServiceCollection())).toThrow('Couldn\'t find .NET SDK Tools');
    });

    afterAll(() => {
        process = _process;
    });
});