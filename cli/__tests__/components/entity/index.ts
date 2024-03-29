import { init } from 'services';
import ServiceBuilder from 'services/serviceBuilder';
import { data, MockConfig, MockFileHandler } from '../mocks';

import { getProjectEntities } from 'components/entity';

describe('components/entity/getProjectEntities', () => {
    beforeAll(() => {
        init(
            ServiceBuilder
                .create()
                .addSingleton<MockConfig>(MockConfig)
                .addSingleton<MockFileHandler>(MockFileHandler)
                .services
        );
    });
    
    it('can get the project entities', async () => {
        const results = await getProjectEntities();
        expect(results).toStrictEqual(data.entities.map(e => e.name));
    });

    afterAll(() => {
        init(ServiceBuilder.create().services);
    })
});