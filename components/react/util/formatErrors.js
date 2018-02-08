import { flatten } from 'underscore'

export default (errs, separator = '; ') =>
  flatten([errs]).map(err => (err.graphQLErrors &&
    err.graphQLErrors.map(({ message }) => message).join(separator)
  ) || err.message).join(separator)
