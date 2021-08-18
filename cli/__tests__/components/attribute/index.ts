import path from 'path';
import { assert } from 'sinon';
import { init } from 'services';
import ServiceBuilder, { Service } from 'services/serviceBuilder';

import { getEntityAttributes } from 'components/attribute';

describe('components/attributes/getEntityAttributes', () => {
    it('Gets attributes.', () => {
        // Setup.
        const entityName = 'entity_name';
        const attrDir = 'attributes';
        const attrs = [ 'attribute_dir_a', 'attribute_dir_b', 'attribute_dir_c' ];
        class MockConfig implements Service<'Config', MockConfig> {
            readonly name = 'Config';
            init = () => new MockConfig();
            get content(): any {
                return {
                    entities: (name: string) => {
                        if (name === entityName) {
                            return {
                                attributes: {
                                    directory: attrDir
                                }
                            }
                        }
                    }
                }
            }
        }
        
        class MockFileHandler implements Service<'FileHandler', MockFileHandler> {
            readonly name = 'FileHandler';
            init = () => new MockFileHandler();
            getStats = (p: string): Promise<any> => Promise.resolve({
                isDirectory: () => attrs.map(a => path.join(attrDir, a)).includes(p)
            });
            readDir = (p: string): Promise<string[]> => Promise.resolve(
                p === attrDir ? [
                    ...attrs,
                    'attribute_file_0',
                    'attribute_file_1',
                ] : []
            );
        }

        init(
            ServiceBuilder
                .create()
                .addSingleton<MockConfig>(MockConfig)
                .addSingleton<MockFileHandler>(MockFileHandler)
                .services
        );

        // Test.
        getEntityAttributes(entityName).then(attributes => assert.match(attributes, attrs));

        // Cleanup.
        init(ServiceBuilder.create().services);
    });
});