const flatten = <T>(array: T[][]): T[] => array.reduce((acc, val) => acc.concat(val), []);
export default flatten;