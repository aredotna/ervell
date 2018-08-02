import { flatten } from 'underscore';

// TODO: Delete along with example
export default (errs, separator = '; ') =>
  flatten([errs]).map(err => (err.graphQLErrors &&
    err.graphQLErrors.map(({ message }) => message).join(separator)
  ) || err.message).join(separator);
