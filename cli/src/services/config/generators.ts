import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { Project } from 'ts-morph';
import { defaultsObject, fileInterface, settingsInterface, validateFunction } from './definitions';
import schema from './schema';

export const generateCode = async (): Promise<void> => {
    const file = path.join(__dirname, 'generated.ts');
    const project = new Project();
    const source = project.createSourceFile(file, undefined, { overwrite: true });
    source.addInterface(fileInterface);
    source.addInterface(settingsInterface);
    source.addVariableStatement(defaultsObject);
    source.addVariableStatement(validateFunction);
    source.formatText({
        baseIndentSize: 0
    });
    await source.save();
    await project.save();
}

export const generateConfig = async (file: string): Promise<void> => {
    const [lastGroup, lastProperty, padSize] = (() => {
        let lg = 0, lp = 0, ps = 0;
        schema.groups.forEach(
            (g, gi) => g.properties.forEach(
                (p, pi) => {
                    if (p.enabled) {
                        lg = gi;
                        lp = pi;
                    }
                    const property = (`  ${p.enabled ? '' : '// '}"${p.name}": ` + ({
                        array: '[',
                        number: `${p.value},`,
                        string: `"${p.value}",`
                    })[p.type] ?? `"${p.value}",`);
                    const padSize = Math.ceil(property.length / 4) * 4;
                    if (padSize > ps) {
                        ps = padSize;
                    }
                }
            )
        );
        return [lg, lp, ps];
    })();
    const stream = await fs.open(file, 'w');
    await stream.write(`{${os.EOL}`);
    for (let gi = 0; gi < schema.groups.length; gi++) {
        const g = schema.groups[gi];
        const ga = schema.groups;
        await stream.write(`  /* ${g.description} */${os.EOL}`);
        for (let pi = 0; pi < g.properties.length; pi++) {
            const p = g.properties[pi];
            const pa = g.properties;
            const comma = !((gi === lastGroup && pi === lastProperty) || (gi === ga.length - 1 && pi === pa.length - 1));
            const property = (`  ${p.enabled ? '' : '// '}"${p.name}": ` + (({
                array: '[',
                number: `${p.value}${comma ? ',' : ''}`,
                string: `"${p.value}"${comma ? ',' : ''}`
            })[p.type] ?? `"${p.value}"${comma ? ',' : ''}`));
            await stream.write(`${p.description ? `${property.padEnd(padSize)}/* ${p.description} */` : property}${os.EOL}`);
            if (p.type === 'array') {
                for (let vi = 0; vi < p.value.length; vi++) {
                    await stream.write(`    "${p.value[vi]}"${vi < p.value.length - 1 ? ',' : ''}${os.EOL}`);
                }
                await stream.write(`  ]${os.EOL}${comma ? ',' : ''}`);
            }
        }
        if (gi < ga.length - 1) {
            await stream.write(os.EOL);
        }
    }
    await stream.write(`}`);
}