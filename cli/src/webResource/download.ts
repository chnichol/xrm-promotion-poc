import { getToken } from '../auth';

export default async function download(name: string): Promise<void> {
    console.log('Download the web resource, ' + name);
    console.log(await getToken());
}