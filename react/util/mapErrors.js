import { compact } from 'underscore';

module.exports = ({ graphQLErrors: errors }) =>
  errors.reduce((memo, { message, extensions: { attribute } }) => {
    // If an attribute is present, return the message keyed by that attribute
    if (attribute) {
      return {
        ...memo,
        attributeErrors: {
          ...memo.attributeErrors,
          [attribute]: message,
        },
      };
    }

    // Otherwise return a general errorMessage,
    // while joining up any/all of them into a single message
    const errorMessage = compact([memo.errorMessage, message])
      // We probably have periods but we might not; add them and dedup
      .join('. ').replace('..', '.');

    return { ...memo, errorMessage };
  }, {
    errorMessage: null,
    attributeErrors: {},
  });
