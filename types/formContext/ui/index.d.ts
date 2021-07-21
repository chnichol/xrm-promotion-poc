import FooterSection from 'footerSection';
import HeaderSection from './headerSection';
import Section from './section';
import Tab from './tab';
export {
    FooterSection,
    HeaderSection,
    Section,
    Tab
}

import Collection from '../../collection';
import Control from '../../control';

export type FormType = 0 | 1 | 2 | 3 | 4 | 6;

export default interface FormContextUI {
    controls: Collection<Control>;
    addOnLoad(myFunction: (executionContext: any) => void): void;
    clearFormNotification(uniqueId: string): boolean;
    close(): void;
    getFormType(): FormType;
    getViewPortHeight(): number;
    getViewPortWidth(): number;
    refreshRibbon(refreshAll: boolean): void;
    removeOnLoad(myFunction: (executionContext: any) => void): void;
    setFormEntityName(arg: string): void;
    setFormNotification(message: string, level: 'ERROR' | 'WARNING' | 'INFO', uniqueId: string): void;
}