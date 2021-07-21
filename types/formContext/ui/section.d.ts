import Collection from '../Collection';
import Control from '../../Control';

interface Section {
    controls: Collection<Control>;
    getLabel(): string;
    getName(): string;
    getParent(): any;
    getVisible(): boolean;
    setLabel(label: string): void;
    setVisible(bool: boolean): void;
}

export default Section;