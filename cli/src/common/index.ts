export const createSearchUrl = (url: string, parameters: { [key: string]: string | undefined }, base?: string | URL | undefined): URL => {
    const searchUrl = new URL(url, base);
    for (const key in parameters) {
        const value = parameters[key];
        if (value) {
            searchUrl.searchParams.append(key, value);
        }
    }
    return searchUrl;
}

export const getPositionals = (args: { _: (number | string)[] }): string[] => args._.slice(1).map(a => a.toString());

export const isUuid = (text: string): boolean => {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
    return (text.match(uuidRegex) ?? []).length > 0
}

export const quote = (a: string | { toString(): string }): string => `'${a}'`;