export type Attribute = {
    name?: string;
    controls: string[];
}

export type Control = {
    id: string;
    field: string;
}

export type Section = {
    index: number;
    label: string;
    name: string;
    controls: Control[];
}

export type Tab = {
    index: number;
    label: string;
    name: string;
    sections: Section[];
}

export type Form = {
    attributes: Attribute[];
    controls: Control[];
    entity: string;
    tabs: Tab[];
}

export type FormXML = {
    form: {
        tabs: [{
            tab: {
                '$': {
                    name: string;
                }
                columns: [{
                    column: {
                        sections: [{
                            section: {
                                '$': {
                                    name: string;
                                }
                                rows?: [{
                                    row: {
                                        cell: {
                                            control?: [{
                                                '$': {
                                                    id: string;
                                                    datafieldname: string;
                                                }
                                            }]
                                        }[]
                                    }[]
                                }]
                            }[]
                        }]
                    }[]
                }]
            }[]
        }]
    }
}

export type ProjectForm = {
    directory: string;
    name: string;
    types: {
        directory: string;
        name: string;
    }[];
}