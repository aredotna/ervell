export const isBlank = value => value === null || value === undefined

export const isNull = value => value === null

export default (x = {}, isBlankFn = isNull) =>
  Object.keys(x).reduce((memo, key) => {
    if (!isBlankFn(x[key])) {
      return { ...memo, [key]: x[key] }
    }

    return memo
  }, {})
