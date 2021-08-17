import path from 'path';
import { v4 as uuid } from 'uuid';
import { Command } from 'components/cli';
import services from 'services';
import { NET_SDK_TOOLS_SN_PATH } from '../../common/constants';
import { getPluginAssemblyProjects } from '.';

const build: Command = async (names: string[]) => {
    const config = services('Config');
    const execute = services('execute');
    const fileHandler = services('FileHandler');
    const varReplacer = services('VarReplacer');

    names = names.length === 0 ? await getPluginAssemblyProjects() : names;

    const projects = names.map(n => ({
        name: n,
        uuid: uuid()
    })).map(n => {
        const f = (root: string) => ({
            csproj: path.join(root, `${n.name}.csproj`),
            dependencies: path.join(root, 'bin', 'Debug'),
            directory: path.join(root),
            dll: path.join(root, 'bin', 'Debug', `${n.name}.dll`),
            key: path.join(root, `${n.name}.snk`),
            output: config.content.pluginAssemblies(n.name).content
        });
        return {
            build: f(path.join(config.project.pluginAssemblies.directory, n.uuid)),
            source: f(path.join(config.project.pluginAssemblies.directory, n.name))
        };
    });

    await Promise.all(
        projects.map(async p => {
            // Generate a strong name key.
            if (!(await fileHandler.exists(p.source.key))) {
                await execute(`"${NET_SDK_TOOLS_SN_PATH}" -k ${p.source.key}`).promise;
            }

            // Create a temp build directory to do any work in.
            await fileHandler.copyDir(p.source.directory, p.build.directory);
            try {
                // Handle variable replacements.
                await Promise.all(
                    (await fileHandler.readDir(p.build.directory, true, /.*\w+\.cs/g)).map(async f => {
                        const oldContents = await fileHandler.readFile(f, 'utf8');
                        const newContents = varReplacer.replace(oldContents);
                        await fileHandler.writeFile(f, newContents, 'utf8');
                    })
                );

                // Build the project.
                await execute(`dotnet build "${p.build.csproj}"`).promise;

                // Merge DLL's into a single file for uploading.
                // await mkdir(path.dirname(p.distributable));
                // const dependencies = (await fs.readdir(p.dependencies)).filter(d => d.match(/.*.dll/g)).map(d => path.join(p.dependencies, d));
                // await exec(`${ILMERGE_PATH} /out:${p.distributable} ${dependencies.join(' ')}`).promise;

                // Sign the DLL.
                await execute(`${NET_SDK_TOOLS_SN_PATH}" -TS "${p.build.dll}" "${p.build.key}"`).promise;

                // Copy the DLL to it's output location.
                await fileHandler.copyFile(p.build.dll, p.build.output);
            }
            catch (e) {
                // For now, just do nothing if an error occurred.
                console.error(e);
            }
            // Clean up the temp build directory.
            finally {
                await fileHandler.removeDir(p.build.directory, true, true);
            }
        })
    );
}

export default build;