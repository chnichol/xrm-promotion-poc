const getPositionals = (args: { _: (number | string)[] }): string[] => args._.slice(1).map(a => a.toString());
export default getPositionals;