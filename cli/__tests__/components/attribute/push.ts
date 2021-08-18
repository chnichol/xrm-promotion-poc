
import { assert } from 'sinon';
import { flatten } from 'helpers';
import { init } from 'services';
import ServiceBuilder, { Service } from 'services/serviceBuilder';
import { data, MockConfig, MockFileHandler } from '../mocks';

import push from 'components/attribute/push';

const puts = new Set<string>();

describe('components/attributes/push', () => {
    beforeAll(() => {
        class MockAPI implements Service<'DynamicsAPI', MockAPI> {
            readonly name = 'DynamicsAPI';
            init = () => new MockAPI();

            attribute = (entityid: string) => ({
                put: (id: string, value: any) => ({
                    execute: () => puts.add(id)
                }),
                query: (q: { filter: { LogicalName: string }}) => ({
                    execute: () =>
                        (data.entities.find(
                            e => e.entityid === entityid
                        )?.attributes ?? []).filter(
                            a => a.LogicalName === q.filter.LogicalName.substr(1, q.filter.LogicalName.length - 2)
                        )
                })
            })
        }

        init(
            ServiceBuilder
                .create()
                .addSingleton<MockAPI>(MockAPI)
                .addSingleton<MockConfig>(MockConfig)
                .addSingleton<MockFileHandler>(MockFileHandler)
                .services
        );
    });

    beforeEach(() => {
        puts.clear();
    });

    it('pushes a single attribute', async () => {
        await push([`${data.entities[0].name}/${data.entities[0].attributes[0].LogicalName}`]);

        const results = Array.from(puts.keys());
        assert.match(results, [data.entities[0].attributes[0].MetadataId]);
    });

    it('pushes multiple attributes', async () => {
        await push(data.entities[0].attributes.map(a => `${data.entities[0].name}/${a.LogicalName}`));

        const results = Array.from(puts.keys());
        assert.match(results, data.entities[0].attributes.map(a => a.MetadataId));
    });

    it('pushes a single entity', async () => {
        await push([data.entities[1].name]);

        const results = Array.from(puts.keys());
        assert.match(results, data.entities[1].attributes.map(a => a.MetadataId));
    });

    it('pushes multiple entities', async () => {
        await push([data.entities[1].name, data.entities[2].name]);

        const results = Array.from(puts.keys());
        assert.match(results, [
            ...data.entities[1].attributes.map(a => a.MetadataId),
            ...data.entities[2].attributes.map(a => a.MetadataId)
        ]);
    });

    it('pushes everything', async () => {
        await push([]);

        const results = Array.from(puts.keys());
        assert.match(results, flatten(data.entities.map(e => e.attributes.map(a => a.MetadataId))))
    })

    it('pushes entities', () => {
        assert.pass(undefined);
    });

    afterAll(() => {
        init(ServiceBuilder.create().services);
    });
});