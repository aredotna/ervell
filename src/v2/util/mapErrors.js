import { compact } from 'underscore';

const MEMO = {
  errorMessage: null,
  attributeErrors: {},
};

export default (err = {}) => {
  if (!err.graphQLErrors || err.graphQLErrors.length === 0) {
    return { ...MEMO, errorMessage: err.message };
  }

  return err.graphQLErrors.reduce((memo, gqlErr = {}) => {
    // If an attribute is present,
    // return the message keyed by that attribute
    if (gqlErr.extensions && gqlErr.extensions.attribute) {
      return {
        ...memo,
        attributeErrors: {
          ...memo.attributeErrors,
          [gqlErr.extensions.attribute]: gqlErr.message,
        },
      };
    }

    // Otherwise return a general errorMessage,
    // while joining up any/all of them into a single message
    const errorMessage = compact([memo.errorMessage, gqlErr.message])
      // We probably have periods but we might not; add them and dedup
      .join('. ')
      .replace('..', '.');

    return { ...memo, errorMessage };
  }, MEMO);
};
