export default (url: string, parameters: { [key: string]: string | undefined }, base?: string | URL | undefined) => {
    const searchUrl = new URL(url, base);
    for (let key in parameters) {
        const value = parameters[key];
        if (value) {
            searchUrl.searchParams.append(key, value);
        }
    }
    return searchUrl;
}