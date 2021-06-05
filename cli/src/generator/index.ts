import axios from 'axios';
import fs from 'fs/promises';
import os from 'os';
import createAxiosRequest from '../common/createAxiosRequest'
import ODataType from './odataType';

export default async (args: string[]) => {
    const [entityName] = args;
    if (entityName) {
        const request = await createAxiosRequest(`EntityDefinitions(LogicalName='${entityName}')/Attributes`, '$select=LogicalName');
        const response = (await axios.get(...request)).data as {
            '@odata.context': string;
            value: {
                '@odata.type': string;
                LogicalName: string;
                MetadataId: string;
            }[];
        };
        console.log(response);
        const file = await fs.open(entityName + '.d.ts', 'w');
        await file.write(`export default interface ${entityName} {${os.EOL}`);
        response.value.forEach(async (v) => {
            if (ODataType[v['@odata.type']]) {
                await file.write(`    ${v.LogicalName}: ${ODataType[v['@odata.type']]};${os.EOL}`);
            }
        });
        await file.write(`}${os.EOL}`);
        await file.close();
    }
}