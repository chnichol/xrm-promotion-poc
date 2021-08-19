import { init } from 'services';
import ServiceBuilder from 'services/serviceBuilder';
import { data, MockConfig, MockFileHandler } from '../mocks';

import { getEntityAttributes } from 'components/attribute';

describe('components/attribute/getEntityAttributes', () => {
    beforeAll(() => {
        // Setup.
        init(
            ServiceBuilder
                .create()
                .addSingleton<MockConfig>(MockConfig)
                .addSingleton<MockFileHandler>(MockFileHandler)
                .services
        );
    });

    it('Gets attributes.', async () => {
        const attributes = await getEntityAttributes(data.entities[0].name);
        expect(attributes).toStrictEqual(data.entities[0].attributes.map(a => a.LogicalName));
    });

    afterAll(() => {
        init(ServiceBuilder.create().services);
    });
});