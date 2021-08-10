const createSearchUrl = (url: string, parameters: { [key: string]: string | undefined }, base?: string | URL | undefined): URL => {
    const searchUrl = new URL(url, base);
    for (const key in parameters) {
        const value = parameters[key];
        if (value) {
            searchUrl.searchParams.append(key, value);
        }
    }
    return searchUrl;
}
export default createSearchUrl;