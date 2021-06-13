import solution from './components/solution/cli';
import solutioncomponent from './components/solutioncomponent/cli';

const argv = process.argv.slice(2);
const command = argv[0];
switch(command) {
    case 'solution':
        solution(argv);
        break;
    case 'solution-component':
        solutioncomponent(argv);
    default:
        console.log('help');
}

