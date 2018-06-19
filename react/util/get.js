export default (obj, path) =>
  path.split('.').reduce((nestedObject, key) => {
    if (nestedObject && key in nestedObject) {
      return nestedObject[key];
    }
    return undefined;
  }, obj);
