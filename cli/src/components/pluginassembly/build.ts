import fs from 'fs/promises';
import fsExtra from 'fs-extra';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { execPromise, exists } from '../../common';
import { NET_SDK_TOOLS_SN_PATH } from '../../common/constants';
import config from '../../config';
import { replaceVarsInDirectory } from '../../common/vars';
import { Command } from '../cli';
import { getPluginAssemblyProjects } from '.';

const build: Command = async (names: string[]) => {
    names = names.length === 0 ? await getPluginAssemblyProjects() : names;

    const projects = names.map(n => ({
        name: n,
        uuid: uuid()
    })).map(n => {
        const f = (root: string) => ({
            csproj: path.join(root, `${n.name}.csproj`),
            dependencies: path.join(root, 'bin', 'Debug', 'net462'),
            directory: path.join(root),
            dll: path.join(root, 'bin', 'Debug', 'net462', `${n.name}.dll`),
            key: path.join(root, `${n.name}.snk`),
            output: config().content.pluginAssemblies(n.name).content
        });
        return {
            build: f(path.join(config().project.pluginAssemblies.directory, n.uuid)),
            source: f(path.join(config().project.pluginAssemblies.directory, n.name))
        };
    });

    await Promise.all(
        projects.map(async p => {
            // Generate a strong name key.
            if (!(await exists(p.source.key))) {
                await execPromise(`"${NET_SDK_TOOLS_SN_PATH}" -k ${p.source.key}`).promise;
            }

            // Create a temp build directory to do any work in.
            await fsExtra.copy(p.source.directory, p.build.directory, { overwrite: true, recursive: true });
            try {
                // Handle variable replacements.
                await replaceVarsInDirectory(p.build.directory, /.*\w+\.cs/g);

                // Build the project.
                await execPromise(`dotnet build "${p.build.csproj}"`).promise;

                // Merge DLL's into a single file for uploading.
                // await mkdir(path.dirname(p.distributable));
                // const dependencies = (await fs.readdir(p.dependencies)).filter(d => d.match(/.*.dll/g)).map(d => path.join(p.dependencies, d));
                // await execPromise(`${ILMERGE_PATH} /out:${p.distributable} ${dependencies.join(' ')}`).promise;

                // Sign the DLL.
                await execPromise(`${NET_SDK_TOOLS_SN_PATH}" -TS "${p.build.dll}" "${p.build.key}"`).promise;

                // Copy the DLL to it's output location.
                await fs.copyFile(p.build.dll, p.build.output);
            }
            catch (e) {
                // For now, just do nothing if an error occurred.
                console.error(e);
            }
            // Clean up the temp build directory.
            finally {
                await fsExtra.rm(p.build.directory, { force: true, maxRetries: 10, recursive: true, retryDelay: 100 });
            }
        })
    );
}

export default build;