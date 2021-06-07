import GetTagValue from './functions/getTagValue';
import IsDefaultPrevented from './functions/isDefaultPrevented';
import PreventDefault from './functions/preventDefault';

export interface EventArgs extends GetTagValue, IsDefaultPrevented, PreventDefault {}