import path from 'path';
import { assert } from 'sinon';
import { Service } from 'services/serviceBuilder';

// TODO: Figure out a way to get Jest to ignore test helper files.
describe('component/mocks', () => {
    it('exists', () => assert.pass({}))
});

export const data = {
    attrDir: 'attributes',
    entityDir: 'entities',
    entities: [
        {
            entityid: 'e1',
            name: 'first_entity',
            attributes: [
                {
                    MetadataId: 'a1',
                    LogicalName: 'attr_a'
                },
                {
                    MetadataId: 'a2',
                    LogicalName: 'attr_b'
                },
                {
                    MetadataId: 'a3',
                    LogicalName: 'attr_c'
                }
            ]
        },
        {
            entityid: 'e2',
            name: 'second_entity',
            attributes: [
                {
                    MetadataId: 'a4',
                    LogicalName: 'attr_d'
                },
                {
                    MetadataId: 'a5',
                    LogicalName: 'attr_e'
                },
                {
                    MetadataId: 'a6',
                    LogicalName: 'attr_f'
                }
            ]
        },
        {
            entityid: 'e3',
            name: 'third_entity',
            attributes: [
                {
                    MetadataId: 'a7',
                    LogicalName: 'attr_g'
                },
                {
                    MetadataId: 'a8',
                    LogicalName: 'attr_h'
                },
                {
                    MetadataId: 'a9',
                    LogicalName: 'attr_i'
                }
            ]
        }
    ]
};

export class MockConfig implements Service<'Config', MockConfig> {
    readonly name = 'Config';
    init = () => new MockConfig();

    content = {
        entities: Object.assign((name: string) => {
            for(const e in data.entities) {
                const entity = data.entities[e];
                if (name === entity.name) {
                    return {
                        definition: path.join(data.entityDir, entity.name, 'definition.json'),
                        attributes: Object.assign((name: string) => {
                            for (const a in entity.attributes) {
                                const attribute = entity.attributes[a];
                                if (name === attribute.LogicalName) {
                                    return {
                                        definition: path.join(data.entityDir, entity.name, data.attrDir, attribute.LogicalName, 'definition.json')
                                    }
                                }
                            }
                        }, {
                            directory: path.join(data.entityDir, entity.name, data.attrDir)
                        })
                    }
                }
            }
        }, {
            directory: data.entityDir
        })
    }
}

export class MockFileHandler implements Service<'FileHandler', MockFileHandler> {
    readonly name = 'FileHandler';
    init = () => new MockFileHandler();

    getStats = (p: string) => {
        for(const e in data.entities) {
            const entity = data.entities[e];
            if (p === path.join(data.entityDir, entity.name)) {
                return Promise.resolve({
                    isDirectory: () => true
                })
            }
            for(const a in entity.attributes) {
                const attribute = entity.attributes[a];
                if (p === path.join(data.entityDir, entity.name, data.attrDir, attribute.LogicalName)) {
                    return Promise.resolve({
                        isDirectory: () => true
                    });
                }
            }
        }
        return Promise.resolve({
            isDirectory: () => false
        });
    }
    loadFile = (p: string, format: string) => {
        if (format === 'json') {
            for (const e in data.entities) {
                const entity = data.entities[e];
                if (p === path.join(data.entityDir, entity.name, 'definition.json')) {
                    return entity;
                }
                for (const a in entity.attributes) {
                    const attribute = entity.attributes[a];
                    if (p === path.join(data.entityDir, entity.name, data.attrDir, attribute.LogicalName, 'definition.json')) {
                        return attribute;
                    }
                }
            }
        }
    }
    readDir = (p: string) => {
        for(const e in data.entities) {
            const entity = data.entities[e];
            if (p === data.entityDir) {
                return Promise.resolve(data.entities.map(e => e.name));
            }
            if (p === path.join(data.entityDir, entity.name, data.attrDir)) {
                return Promise.resolve(entity.attributes.map(a => a.LogicalName));
            }
        }
        return Promise.resolve([]);
    }
}