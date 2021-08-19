type Constructor<T> = new (...params: any[]) => T;

type ServiceDestructure<T> = T extends Service<infer U, infer V> ? { 0: U, 1: V } : never;

type ServiceGetter<T extends Service<string, unknown>> = {
    get: (name: ServiceDestructure<T>[0]) => ServiceDestructure<T>[1]
}

type ServiceBuilderGenerator<C extends ServiceCollection> = {
    get services(): C;
    addSingleton: <T extends Service<string, unknown>>(service: Constructor<T>) => ServiceBuilderGenerator<ServiceGetter<T> & C>;
    addTransient: <T extends Service<string, unknown>>(service: Constructor<T>) => ServiceBuilderGenerator<ServiceGetter<T> & C>;
}

type ServiceEntry = {
    initializer: (services: ServiceCollection) => any;
    instance: any;
    type: 'singleton' | 'transient';
}

export type Service<T extends string, U> = {
    readonly name: T;
    init: (services: ServiceCollection) => U ;
}

export type ServiceCollection = {
    get: (name: string) => any;
}

export class EmptyServiceCollection {
    public get = (_: string) => undefined;
}

export default class ServiceBuilder<C extends ServiceCollection> implements ServiceBuilderGenerator<C> {
    private readonly _map: Map<string, ServiceEntry>;
    
    private readonly _services: C;

    constructor (map: Map<string, ServiceEntry>, services: C) {
        this._map = map;
        this._services = services;
    }

    public get services() {
        return this._services;
    }

    public addSingleton = <T extends Service<string, unknown>>(service: new (...params: any[]) => T): ServiceBuilder<{ get: (name: ServiceDestructure<T>[0]) => ServiceDestructure<T>[1] } & C> => this._addService(service, 'singleton');

    public addServices = <T extends ServiceCollection>(add: (builder: ServiceBuilder<C>) => ServiceBuilder<T>) => add(this);

    public addTransient = <T extends Service<string, unknown>>(service: new (...params: any[]) => T): ServiceBuilder<{ get: (name: ServiceDestructure<T>[0]) => ServiceDestructure<T>[1] } & C> => this._addService(service, 'transient');

    private _addService = <T extends Service<string, unknown>>(service: new (...params: any[]) => T, type: 'singleton' | 'transient'): ServiceBuilder<{ get: (name: ServiceDestructure<T>[0]) => ServiceDestructure<T>[1] } & C> => {
        type serviceType = Service<ServiceDestructure<T>[0], ServiceDestructure<T>[1]>;
        const dummy = new service();
        const name: serviceType['name'] = dummy.name;
        const init: serviceType['init'] = dummy.init;

        if (this._map.has(name)) {
            throw `Service already defined for "${name}"`;
        }

        const entry = {
            initializer: init,
            instance: null,
            type
        };
        this._map.set(name, entry);

        (this._services as any).get = (name: serviceType['name']) => {
            const s = this._map.get(name);
            if (!s) {
                throw `Service not defined for "${name}"`;
            }
            switch (s.type) {
                case 'singleton':
                    if (s.instance === null) {
                        s.instance = s.initializer(this._services);
                    }
                    return s.instance;
                case 'transient':
                    return s.initializer(this._services);
            }
        };

        return this as unknown as ServiceBuilder<{ get: (name: ServiceDestructure<T>[0]) => ServiceDestructure<T>[1] } & C>;
    }

    public static create = () => new ServiceBuilder<ServiceCollection>(new Map<string, ServiceEntry>(), new EmptyServiceCollection());
}
