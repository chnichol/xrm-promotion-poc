import createSapling from './entities/new_student/createSapling';
import schoolOnLoad from './entities/new_school/onLoad';

const schoolForm = {
    onLoad: schoolOnLoad
}

const studentForm = {
    createSapling
};

export {
    schoolForm,
    studentForm
}