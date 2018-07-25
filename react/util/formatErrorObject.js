import { each } from 'underscore';

module.exports = (errors) => {
  const errorObject = {};
  if (errors.graphQLErrors) {
    each(errors.graphQLErrors, (error) => {
      errorObject[error.extensions && error.extensions.attribute] = error.message;
    });
  }
  return errorObject;
};
