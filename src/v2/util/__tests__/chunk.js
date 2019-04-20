import chunk from 'v2/util/chunk';

describe('chunk', () => {
  const xs = 'abcdefghijklmnop'.split('');

  it('chunks the array into n pieces', () => {
    expect(chunk(xs, 3)).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
      ['j', 'k', 'l'],
      ['m', 'n', 'o'],
      ['p'],
    ]);
  });

  it('works with empty arrays', () => {
    expect(chunk([], 3)).toEqual([]);
  });
});
