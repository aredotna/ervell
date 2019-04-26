import compactObject, { isBlank } from 'v2/util/compactObject'

describe('compactObject', () => {
  it('removes null values from the object', () => {
    expect(
      compactObject({
        a: 'foo',
        b: false,
        c: null,
        d: 1,
        e: 0,
        f: '',
        g: undefined,
      })
    ).toEqual({
      a: 'foo',
      b: false,
      d: 1,
      e: 0,
      f: '',
      g: undefined,
    })
  })

  it('accepts a function to tailor what it checks for', () => {
    expect(
      compactObject(
        {
          a: 'foo',
          b: false,
          c: null,
          d: 1,
          e: 0,
          f: '',
          g: undefined,
        },
        isBlank
      )
    ).toEqual({
      a: 'foo',
      b: false,
      d: 1,
      e: 0,
      f: '',
    })
  })
})
