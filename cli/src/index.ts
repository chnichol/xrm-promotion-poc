import webResource from './webResource';

/**
 * Provide a basic CLI parser.
 * @param command Command selector.
 * @param args Command line argument values.
 */
function main(command: string, args: string[]) {
    switch (command) {
        case 'wr':
        case 'web-resource':
            webResource(args);
            break;
        default:
            console.warn(`Command "${command}" not recognized.`);
    }
}

/** Destructure the command line arguments. */
(([a, b, c, ...d]: string[]) => main(c, d))(process.argv);