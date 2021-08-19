import path from 'path';
import services, { init } from 'services';
import { ILMERGE_PATH } from 'services/constants';
import ServiceBuilder, { Service, EmptyServiceCollection } from 'services/serviceBuilder';

const _process = process;
const ildir = path.join(process.env.USERPROFILE || 'missing_userprofile', '.nuget', 'packages', 'ilmerge');

describe('services/constants/ILMERGE_PATH', () => {
    beforeAll(() => {
        process = {
            ...process,
            platform: process.platform
        };
    });

    it('can create the service with no parameters', () => {
        const service = new ILMERGE_PATH();
        expect(service.name).toStrictEqual('ILMERGE_PATH');
        expect(service.init).toBeDefined();
    });
    
    it('can find the path to .NET SDK tools', () => {
        process.platform = 'win32';

        class MockFileQuickReader implements Service<'FileQuickReader', MockFileQuickReader> {
            readonly name = 'FileQuickReader';
            init = () => new MockFileQuickReader();
            readDir = (dir: string) => dir === ildir ? [ '1.2.3' ] : []; 
        }
        init(
            ServiceBuilder.create()
                .addSingleton(MockFileQuickReader)
                .addSingleton(ILMERGE_PATH)
                .services
        );

        const result = services('ILMERGE_PATH');
        expect(result).toStrictEqual(path.join(ildir, '1.2.3', 'tools', 'net452', 'ILMerge.exe'));
    });

    it('can pick the most recent versions when multiple are available', () => {
        process.platform = 'win32';

        class MockFileQuickReader implements Service<'FileQuickReader', MockFileQuickReader> {
            readonly name = 'FileQuickReader';
            init = () => new MockFileQuickReader();
            readDir = (dir: string) => dir === ildir ? [ '1.3.5', '3.2.1' ] : []; 
        }
        init(
            ServiceBuilder.create()
                .addSingleton(MockFileQuickReader)
                .addSingleton(ILMERGE_PATH)
                .services
        );

        const result = services('ILMERGE_PATH');
        expect(result).toStrictEqual(path.join(ildir, '3.2.1', 'tools', 'net452', 'ILMerge.exe'));
    });

    it('cannot resolve when running on non-windows platforms', () => {
        process.platform = 'aix';
        expect(() => new ILMERGE_PATH().init(new EmptyServiceCollection())).toThrow('ILMerge is only available on Windows');
    });

    it('cannot resolve when .NET SDK tools are not installed', () => {
        process.platform = 'win32';
        expect(() => new ILMERGE_PATH().init(new EmptyServiceCollection())).toThrow('Couldn\'t find ILMerge.exe');
    });

    afterAll(() => {
        process = _process;
    });
});