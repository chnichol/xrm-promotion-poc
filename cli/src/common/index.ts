
export const createSearchUrl = (url: string, parameters: { [key: string]: string | undefined }, base?: string | URL | undefined) => {
    const searchUrl = new URL(url, base);
    for (let key in parameters) {
        const value = parameters[key];
        if (value) {
            searchUrl.searchParams.append(key, value);
        }
    }
    return searchUrl;
}

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;

export const isUuid = (text: string) => (text.match(uuidRegex) ?? []).length > 0;