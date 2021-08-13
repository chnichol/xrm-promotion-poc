import { ChildProcess as Process, exec } from 'child_process';
import { Service } from './serviceBuilder';

type ChildProcess = Process & {
    readonly promise: Promise<unknown>;
}

type ChildProcessLauncher = (command: string) => ChildProcess;

export default class Execute implements Service<'execute', ChildProcessLauncher> {
    public readonly name = 'execute';
    public init = () => {
        const childProcessLauncher = (command: string) => {
            const child = exec(command) as any;
            const promise = new Promise((resolve, reject) => {
                child.addListener('error', reject);
                child.addListener('exit', resolve);
            });
            child.promise = promise;
            
            return child as ChildProcess;
        };
        return childProcessLauncher;
    }
}