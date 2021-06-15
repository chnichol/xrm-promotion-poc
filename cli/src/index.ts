import entity from './components/entity/cli';
import solution from './components/solution/cli';
import solutioncomponent from './components/solutioncomponent/cli';
import webresource from './components/webresource/cli';

const argv = process.argv.slice(2);
const command = argv[0];
switch(command) {
    case 'entity':
        entity(argv);
        break;
    case 'solution':
        solution(argv);
        break;
    case 'solution-component':
        solutioncomponent(argv);
        break;
    case 'web-resource':
        webresource(argv);
        break;
    default:
        console.log('help');
}

