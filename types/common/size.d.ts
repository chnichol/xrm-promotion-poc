export interface SizeOptions {
    /** Height of the confirmation dialog in pixels. */
    height?: number;
    /** Width of the confirmation dialog in pixels. */
    width?: number;
}

export interface SizeValue {
    /** The numerical value. */
    value: number;
    /** The unit of measurement. */
    unit: '%' | 'px';
}