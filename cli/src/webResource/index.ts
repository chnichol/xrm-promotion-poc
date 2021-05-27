import download from "./download";

export default function main(args: string[]) {
    const [action, ...options] = args;
    switch (action) {
        case 'download':
            const [name] = options;
            if (name) {
                download(name);
            }
            break;
        default:
            console.warn(`[web-resource] Action "${action}" not recognized.`);
    }
}