import { ChildProcess as Process, exec } from 'child_process';
import { Service } from './serviceBuilder';

type ChildProcess = Process & {
    readonly promise: Promise<Exit>;
}

type ChildProcessLauncher = (command: string) => ChildProcess;

type Exit = {
    code: number | null,
    signal: NodeJS.Signals | null
};

export default class Execute implements Service<'execute', ChildProcessLauncher> {
    public readonly name = 'execute';
    public init = () => {
        const childProcessLauncher = (command: string) => {
            const child = exec(command) as any;
            const promise = new Promise<Exit>((resolve, reject) => {
                child.addListener('error', (error: Error) => reject(error));
                child.addListener('exit', (code: number | null, signal: NodeJS.Signals | null) => resolve({ code, signal }));
            });
            child.promise = promise;
            
            return child as ChildProcess;
        };
        return childProcessLauncher;
    }
}