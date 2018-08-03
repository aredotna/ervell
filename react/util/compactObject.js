export default (x = {}) =>
  Object.keys(x).reduce((memo, key) => {
    if (x[key] !== null) {
      return { ...memo, [key]: x[key] };
    }
    return memo;
  }, {});
