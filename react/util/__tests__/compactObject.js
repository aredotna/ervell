import compactObject from 'react/util/compactObject';

describe('compactObject', () => {
  it('removes null values from the object', () => {
    expect(compactObject({
      a: 'foo',
      b: false,
      c: null,
      d: 1,
      e: 0,
    })).toEqual({
      a: 'foo',
      b: false,
      d: 1,
      e: 0,
    });
  });
});
