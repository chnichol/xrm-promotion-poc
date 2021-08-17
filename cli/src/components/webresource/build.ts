import path from 'path';
import { Command } from 'components/cli';
import services from 'services';
import { WebResourceType } from 'types/entity/WebResource';
import { getWebResourceProjects } from '.'

const build: Command = async () => {
    const config = services('Config');
    const execute = services('execute');
    const fileHandler = services('FileHandler');
    const names = await getWebResourceProjects();
    const projects = names.map(n => ({
        dist: path.join(config.project.webResources.directory, 'dist', n.replace(/\.ts/g, '.js')),
        src: path.join(config.project.webResources.directory, 'src', n),
        output: config.content.webResources(n.replace(/\.(ts|js)/g, ''), WebResourceType.JScript).content
    }));

    // Build the web resource project.
    await execute(`npm run build --prefix "${config.project.webResources.directory}"`).promise;

    await Promise.all(
        projects.map(async p => {
            // Copy the JS to it's output location.
            try {
                await fileHandler.copyFile(p.dist, p.output);
            }
            catch {
                // For now, just do nothing if an error occurred.
            }
        })
    );
}
export default build;