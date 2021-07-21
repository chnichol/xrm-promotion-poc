import Collection from '../Collection';
import Section from './Section';

interface Tab {
    sections: Collection<Section>;
    getContentType(): 'cardSections' | 'singleComponent';
    getDisplayState(): 'collapsed' | 'expanded';
    getLabel(): string;
    getName(): string | undefined;
    getParent(): any;
    getVisible(): boolean;
    setContentType(contentType: 'cardSections' | 'singleComponent'): void;
    setDisplayState(state: 'collapsed' | 'expanded'): void;
    setFocus(): void;
    setLabel(label: string): void;
    setVisible(bool: boolean): void;
}

export default Tab;