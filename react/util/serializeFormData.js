export default formData =>
  Array.from(formData.entries()).reduce((memo, pair) => ({
    ...memo, [pair[0]]: pair[1],
  }), {});
