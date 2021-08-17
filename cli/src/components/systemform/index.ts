import path from 'path';
import services from 'services';
import { ProjectForm } from './types';

export const getEntityForms = async (entity: string): Promise<ProjectForm[]> => {
    const config = services('Config');
    const fileHandler = services('FileHandler');
    const entityDir = config.content.entities(entity).systemForms.directory;
    const formDirs = await fileHandler.readDir(entityDir);
    const forms: ProjectForm[] = [];
    for (let i = 0; i < formDirs.length; i++) {
        const form: ProjectForm = {
            directory: path.join(entityDir, formDirs[i]),
            name: formDirs[i],
            types: []
        };
        if (!(await fileHandler.getStats(form.directory)).isDirectory()) {
            continue;
        }
        const formSubDirs = await fileHandler.readDir(form.directory);
        for (let j = 0; j < formSubDirs.length; j++) {
            const formType = {
                directory: path.join(form.directory, formSubDirs[j]),
                name: formSubDirs[j]
            };
            if (!(await fileHandler.getStats(formType.directory)).isDirectory()) {
                continue;
            }
            form.types.push(formType);
        }
        forms.push(form);
    }
    return forms;
}