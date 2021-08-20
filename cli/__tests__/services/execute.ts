import Execute from 'services/execute';

describe('services/execute', () => {
    it('can create the service with no parameters', () => {
        const service = new Execute();
        expect(service.name).toStrictEqual('execute');
        expect(service.init).toBeDefined();
    });

    it('can start a child process as a promise', () => {
        const execute = new Execute().init();
        const process = execute('node');
        expect(process.pid).toBeDefined();
        expect(process.promise).toBeDefined();
        process.kill();
    });

    it('can resolve a successful child process with exit code 0', async () => {
        const execute = new Execute().init();
        const process = execute('node --eval "(1 + 1).toString()"');
        await expect(process.promise).resolves.toHaveProperty('code', 0);
        process.kill();
    });

    it('can resolve a failed child process with exit code 1', async () => {
        const execute = new Execute().init();
        const process = execute('node --eval "undefined.toString()"');
        await expect(process.promise).resolves.toHaveProperty('code', 1);
        process.kill();
    });
});