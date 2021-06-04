import axios from 'axios';
import createAxiosRequest from '../common/createAxiosRequest';

export default async function download(name: string): Promise<void> {
    const request = await createAxiosRequest('webresourceset', `$filter=name eq '${name}'&$top=1`);
    const response = await axios.get(...request);
    console.log(response.data.value[0].description);
}