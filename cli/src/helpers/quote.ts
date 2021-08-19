const quote = (a: string | { toString(): string }): string => `'${a}'`;
export default quote;