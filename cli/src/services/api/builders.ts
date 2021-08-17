import { Config, HTTP } from '..';
import handler from './handler';
import { ExpandArray, Filter, Request, RequestBody, Query, Lookup, Update, Expand, UpdateRequest, UpdateBody } from './types';

class RequestBuilder<Response> implements Request<Response> {
    readonly body: RequestBody;
    constructor(request: RequestBody) {
        this.body = request;
    }
    execute(): Promise<Response> {
        return handler<unknown, Response>(this.body);
    }
}

class UpdateRequestBuilder<Properties> implements UpdateRequest<Properties> {
    readonly body: UpdateBody<Properties>;
    constructor(request: UpdateBody<Properties>) {
        this.body = request;
    }
    execute(): Promise<void> {
        return handler<Properties, void>(this.body);
    }
}

class ExpandBuilder<Singles, Collections, Response> implements Expand<Singles, Collections, Response> {
    private readonly _request: Request<Response>;
    readonly body: RequestBody;
    constructor(request: RequestBody) {
        this._request = new RequestBuilder(request);
        this.body = request;
    }
    execute() {
        return this._request.execute();
    }
    expandSingle<S extends keyof Singles, E extends keyof Singles[S]>(collection: S, parameters?: { select?: E[]; }): Expand<Singles, Collections, Response & { [Key in S]: { [Select in E]: Singles[S][Select]; }; }> {
        const expand = this.body.expand ?? [];
        expand.push({
            property: collection.toString(),
            select: parameters?.select?.map(s => s.toString())
        })
        
        type ExpandedResponse = Response & {
            [Key in S]: {
                [Select in E]: Singles[S][Select];
            };
        };

        return new ExpandBuilder<Singles, Collections, ExpandedResponse>({ ...this.body, expand });
    }
    expandCollection<S extends keyof Collections, E extends keyof Collections[S]>(collection: S, parameters?: { filter?: Filter<Collections[S]>, select?: E[]; }): Expand<Singles, Collections, Response & { [Key in S]: { [Select in E]: Collections[S][Select]; }[]; }> {
        const expand = this.body.expand ?? [];
        expand.push({
            property: collection.toString(),
            filter: parameters?.filter,
            select: parameters?.select?.map(s => s.toString())
        })
        
        type ExpandedResponse = Response & {
            [Key in S]: {
                [Select in E]: Collections[S][Select];
            }[];
        };
        return new ExpandBuilder<Singles, Collections, ExpandedResponse>({ ...this.body, expand });
    }
}

class ExpandArrayBuilder<Singles, Collections, Response> implements ExpandArray<Singles, Collections, Response> {
    private readonly _request: Request<Response[]>;
    readonly body: RequestBody;
    constructor(request: RequestBody) {
        this._request = new RequestBuilder(request);
        this.body = request;
    }
    execute() {
        return this._request.execute();
    }
    expandSingle<S extends keyof Singles, E extends keyof Singles[S]>(collection: S, parameters?: { select?: E[]; }): ExpandArray<Singles, Collections, Response & { [Key in S]: { [Select in E]: Singles[S][Select]; }; }> {
        const expand = this.body.expand ?? [];
        expand.push({
            property: collection.toString(),
            select: parameters?.select?.map(s => s.toString())
        })
        
        type ExpandedResponse = Response & {
            [Key in S]: {
                [Select in E]: Singles[S][Select];
            };
        };

        return new ExpandArrayBuilder<Singles, Collections, ExpandedResponse>({ ...this.body, expand });
    }
    expandCollection<S extends keyof Collections, E extends keyof Collections[S]>(collection: S, parameters?: { filter?: Filter<Collections[S]>, select?: E[]; }): ExpandArray<Singles, Collections, Response & { [Key in S]: { [Select in E]: Collections[S][Select]; }[]; }> {
        const expand = this.body.expand ?? [];
        expand.push({
            property: collection.toString(),
            filter: parameters?.filter,
            select: parameters?.select?.map(s => s.toString())
        })
        
        type ExpandedResponse = Response & {
            [Key in S]: {
                [Select in E]: Collections[S][Select];
            }[];
        };
        return new ExpandArrayBuilder<Singles, Collections, ExpandedResponse>({ ...this.body, expand });
    }
}

export class ApiBuilder<P, L, S, C> implements Lookup<P, L, S, C>, Query<P, L, S, C>, Update<P> {
    private readonly _resource: string;
    constructor(resource: string) {
        this._resource = resource;
    }
    lookup<Select extends keyof (P & L)>(id: string, parameters?: { select?: Select[]; }): Expand<S, C, { [Key in Select]: (P & L)[Key]; }> {
        return new ExpandBuilder({
            type: 'lookup',
            resource: this._resource,
            id: id,
            select: parameters?.select?.map(s => s.toString())
        });
    }
    patch(id: string, data: Partial<P>): UpdateRequest<P> {
        return new UpdateRequestBuilder<P>({
            type: 'update',
            method: 'PATCH',
            resource: this._resource,
            id: id,
            data: data
        });
    }
    put(id: string, data: P): UpdateRequest<P> {
        return new UpdateRequestBuilder<P>({
            type: 'update',
            method: 'PUT',
            resource: this._resource,
            id: id,
            data: data
        });
    }
    query<Select extends keyof (P & L)>(parameters?: { filter?: Filter<P>; select?: Select[]; }): ExpandArray<S, C, { [Key in Select]: (P & L)[Key]; }> {
        return new ExpandArrayBuilder({
            type: 'query',
            resource: this._resource,
            filter: parameters?.filter,
            select: parameters?.select?.map(s => s.toString())
        });
    }
}