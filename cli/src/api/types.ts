export type Filter<T> = {
    [Key in keyof T]?: T[Key];
}

export type ExpandBody = {
    property: string;
    filter?: {
        [key: string]: any;
    }
    select?: string[];
}

export type LookupBody = {
    type: 'lookup',
    resource: string,
    id: string;
    select?: string[];
    expand?: ExpandBody[];
}

export type QueryBody = {
    type: 'query',
    resource: string,
    filter?: {
        [key: string]: any;
    }
    select?: string[],
    expand?: ExpandBody[]
}

export type PatchBody<Properties> = {
    type: 'update';
    method: 'PATCH';
    resource: string;
    id: string;
    data: Partial<Properties>;
}

export type PutBody<Properties> = {
    type: 'update',
    method: 'PUT',
    resource: string,
    id: string,
    data: Properties
}

export type RequestBody = LookupBody | QueryBody;

export type Request<Response> = {
    readonly body: RequestBody;
    execute(): Promise<Response>;
}

export type UpdateBody<Properties> = PatchBody<Properties> | PutBody<Properties>;

export type UpdateRequest<Properties> = {
    readonly body: UpdateBody<Properties>;
    execute(): Promise<void>;
}

export type Expand<Singles, Collections, Response> = Request<Response> & {
    expandSingle<S extends keyof Singles, E extends keyof Singles[S]>(collection: S, parameters?: { select?: E[] }): Expand<
        Singles,
        Collections,
        Response & {
            [Key in S]: {
                [Select in E]: Singles[S][Select];
            };
        }>
    expandCollection<S extends keyof Collections, E extends keyof Collections[S]>(collection: S, parameters?: { filter?: Filter<Collections[S]>, select?: E[] }): Expand<
        Singles,
        Collections,
        Response & {
            [Key in S]: {
                [Select in E]: Collections[S][Select];
            }[];
        }>
} 

export type ExpandArray<Singles, Collections, Response> = Request<Response[]> & {
    expandSingle<S extends keyof Singles, E extends keyof Singles[S]>(collection: S, parameters?: { select?: E[] }): ExpandArray<
        Singles,
        Collections,
        Response & {
            [Key in S]: {
                [Select in E]: Singles[S][Select];
            };
        }>
    expandCollection<S extends keyof Collections, E extends keyof Collections[S]>(collection: S, parameters?: { filter?: Filter<Collections[S]>, select?: E[] }): ExpandArray<
        Singles,
        Collections,
        Response & {
            [Key in S]: {
                [Select in E]: Collections[S][Select];
            }[];
        }>
}

export type Lookup<Properties, Lookups, Singles, Collections> = {
    lookup<S extends keyof (Properties & Lookups)>(id: string, parameters?: {
        select?: S[]
    }): Request<{ [Key in S]: (Properties & Lookups)[Key] }> & Expand<Singles, Collections, { [Key in S]: (Properties & Lookups)[Key] }>;
}

export type Query<Properties, Lookups, Singles, Collections> = {
    query<S extends keyof (Properties & Lookups)>(parameters?: {
        filter?: Filter<Properties & Lookups>,
        select?: S[]
    }): Request<{ [Key in S]: (Properties & Lookups)[Key] }[]> & ExpandArray<Singles, Collections, { [Key in S]: (Properties & Lookups)[Key] }>;
}

export type Update<Properties> = {
    put(id: string, data: Properties): UpdateRequest<Properties>;
    patch(id: string, data: Partial<Properties>): UpdateRequest<Properties>;
}