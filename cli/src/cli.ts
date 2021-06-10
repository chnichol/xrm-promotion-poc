import yargs, { string } from 'yargs';
import solution from './components/solution/cli';

const argv = process.argv.slice(2);
const command = argv[0];
switch(command) {
    case 'solution':
        solution(argv);
    default:
        console.log('help');
}

