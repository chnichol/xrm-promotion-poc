import GetSaveMode from './functions/getSaveMode';
import PreventDefault from './functions/preventDefault';
import IsDefaultPrevented from './functions/isDefaultPrevented';

export interface EventArgs extends GetSaveMode, PreventDefault, IsDefaultPrevented {}