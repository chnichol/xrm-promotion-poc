import fs from 'fs/promises';
import path from 'path';
import { execPromise } from '../../common';
import config from '../../services/config';
import { WebResourceType } from '../../types/entity/WebResource';
import { Command } from '../cli';
import { getWebResourceProjects } from '.'

const build: Command = async () => {
    const names = await getWebResourceProjects();
    const projects = names.map(n => ({
        dist: path.join(config().project.webResources.directory, 'dist', n.replace(/\.ts/g, '.js')),
        src: path.join(config().project.webResources.directory, 'src', n),
        output: config().content.webResources(n.replace(/\.(ts|js)/g, ''), WebResourceType.JScript).content
    }));

    // Build the web resource project.
    await execPromise(`npm run build --prefix "${config().project.webResources.directory}"`).promise;

    await Promise.all(
        projects.map(async p => {
            // Copy the JS to it's output location.
            try {
                await fs.copyFile(p.dist, p.output);
            }
            catch {
                // For now, just do nothing if an error occurred.
            }
        })
    );
}
export default build;