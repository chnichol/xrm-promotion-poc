import download from "./download";
import upload from "./upload";

export default function main(args: string[]) {
    const [action, ...options] = args;
    switch (action) {
        case 'download': {
            const [name] = options;
            if (name) {
                download(name);
            }
        } break;
        case 'upload': {
            const [name] = options;
            if (name) {
                upload(name);
            }
        } break;
        default:
            console.warn(`[web-resource] Action "${action}" not recognized.`);
    }
}

export enum WebResourceType {
    HTML = 1,
    CSS = 2,
    JScript = 3,
    XML = 4,
    PNG = 5,
    JPG = 6,
    GIF = 7,
    XAP = 8,
    XSL = 9,
    ICO = 10
}