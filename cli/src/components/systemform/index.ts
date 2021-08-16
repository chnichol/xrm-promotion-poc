import fs from 'fs/promises';
import path from 'path';
import config from '../../services/config';
import { ProjectForm } from './types';

export const getEntityForms = async (entity: string): Promise<ProjectForm[]> => {
    const entityDir = config().content.entities(entity).systemForms.directory;
    const formDirs = await fs.readdir(entityDir);
    const forms: ProjectForm[] = [];
    for (let i = 0; i < formDirs.length; i++) {
        const form: ProjectForm = {
            directory: path.join(entityDir, formDirs[i]),
            name: formDirs[i],
            types: []
        };
        if (!(await fs.lstat(form.directory)).isDirectory()) {
            continue;
        }
        const formSubDirs = await fs.readdir(form.directory);
        for (let j = 0; j < formSubDirs.length; j++) {
            const formType = {
                directory: path.join(form.directory, formSubDirs[j]),
                name: formSubDirs[j]
            };
            if (!(await fs.lstat(formType.directory)).isDirectory()) {
                continue;
            }
            form.types.push(formType);
        }
        forms.push(form);
    }
    return forms;
}