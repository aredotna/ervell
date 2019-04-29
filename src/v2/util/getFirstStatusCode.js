module.exports = (err = {}, idx = 0) => {
  if (!err.graphQLErrors || err.graphQLErrors.length === 0) {
    return null
  }

  const firstError = err.graphQLErrors[idx]

  if (!firstError.extensions) {
    return null
  }

  return firstError.extensions.code
}
