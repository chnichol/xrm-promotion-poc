import { flatten } from 'helpers';

describe('helpers/flatten', () => {
    it('can flatten multidimensional arrays of one type', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const result = flatten(array);
        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });

    it('can flatten multidimensional arrays of two types', () => {
        const array = [
            [1, 2, 3],
            ['a', 'b', 'c']
        ];
        const result = flatten<number | string>(array);
        expect(result).toStrictEqual([1, 2, 3, 'a', 'b', 'c']);
    });
});