import { each } from 'underscore';
import { capitalize } from 'underscore.string';

module.exports = (errors) => {
  const errorObject = {};
  if (errors.graphQLErrors) {
    each(errors.graphQLErrors, (error) => {
      errorObject[error.extensions && error.extensions.attribute] = capitalize(error.message, true);
    });
  }
  return errorObject;
};
