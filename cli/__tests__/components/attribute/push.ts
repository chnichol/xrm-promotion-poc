
import { assert } from 'sinon';
import { flatten } from 'helpers';
import { init } from 'services';
import ServiceBuilder, { Service } from 'services/serviceBuilder';
import { data, MockConfig, MockFileHandler } from '../mocks';

import push from 'components/attribute/push';

const _attribute = data.entities[0].attributes[0];
type Attribute = typeof _attribute;
const puts = new Map<string, Attribute>();

describe('components/attributes/push', () => {
    beforeAll(() => {
        class MockAPI implements Service<'DynamicsAPI', MockAPI> {
            readonly name = 'DynamicsAPI';
            init = () => new MockAPI();

            attribute = (entityid: string) => ({
                put: (id: string, value: Attribute) => ({
                    execute: () => puts.set(id, value)
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

    it('can update a single attribute', async () => {
        await push([`${data.entities[0].name}/${data.entities[0].attributes[0].LogicalName}`]);

        const results = Array.from(puts.values());
        assert.match(results, [data.entities[0].attributes[0]]);
    });

    it('can update multiple attributes', async () => {
        await push(data.entities[0].attributes.map(a => `${data.entities[0].name}/${a.LogicalName}`));

        const results = Array.from(puts.values());
        assert.match(results, data.entities[0].attributes);
    });

    it('can update a single entity', async () => {
        await push([data.entities[1].name]);

        const results = Array.from(puts.values());
        assert.match(results, data.entities[1].attributes);
    });

    it('can update multiple entities', async () => {
        await push([data.entities[1].name, data.entities[2].name]);

        const results = Array.from(puts.values());
        assert.match(results, [
            ...data.entities[1].attributes,
            ...data.entities[2].attributes
        ]);
    });

    it('can update all project attributes', async () => {
        await push([]);

        const results = Array.from(puts.values());
        assert.match(results, flatten(data.entities.map(e => e.attributes)));
    })

    it('cannot update missing attributes', async () => {
        try {
            await push([`${data.entities[0].name}/missing`]);
            assert.fail();
        }
        catch {
            assert.pass({});
        }
    });

    it('cannot update missing entities', async () => {
        try {
            await push(['missing']);
            assert.fail();
        }
        catch {
            assert.pass({});
        }
    });

    afterAll(() => {
        init(ServiceBuilder.create().services);
    });
});