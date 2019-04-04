// NOTE: This module just tries to map strings in the
// overall error message to corresponding error codes.
// It should be considered a last resort. Individual apps should
// handle their own errors using the status code extension in GraphQL queries.
// It's existence is only really a temporary compatibility layer between our error responses
// and the doomed artsy-error-middleware.

import { any } from 'underscore';

const contains = (message, targetStrings = []) =>
  any(targetStrings.map(targetString =>
    message.toLowerCase().indexOf(targetString.toLowerCase()) >= 0)
  );

export default (err, _req, _res, next) => {
  const errMessage = err.message && err.message.toLowerCase();

  if (contains(errMessage, [
    'not found', // Old-style errors
    "can't find", // New-style errors
    "couldn't find", // New-style errors
  ])) {
    const error = new Error('Not found');
    error.status = 404;
    error.originalMessage = err.message;
    error.stack = err.stack;
    return next(error);
  }

  if (contains(errMessage, [
    'unauthorized', // Old-style errors
    'access denied', // Old-style errors
    'unable to', // New-style errors
    'requires sign in', // New-style errors
  ])) {
    const error = new Error('Access denied');
    error.status = 401;
    error.originalMessage = err.message;
    error.stack = err.stack;
    return next(error);
  }

  return next(err);
};
