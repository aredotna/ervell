import { any } from 'underscore'
import { IpDeniedError } from 'express-ipfilter'

const contains = (message, targetStrings = []) =>
  any(
    targetStrings.map(
      targetString =>
        message.toLowerCase().indexOf(targetString.toLowerCase()) >= 0
    )
  )

const prepareError = ({ status, message, err }) => {
  const error = new Error(message)
  error.status = status
  error.originalMessage = err.message
  error.stack = err.stack
  return error
}

export default (err, req, res, next) => {
  if (err instanceof IpDeniedError) {
    console.log('IP Denied from user agent:', req.headers['user-agent'])
    return res.status(403).end()
  }

  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    const firstErr = err.graphQLErrors[0]
    const statusCode = firstErr.extensions && firstErr.extensions.code
    if (statusCode) {
      switch (statusCode) {
        case 'UNAUTHORIZED':
          return next(
            prepareError({
              err,
              status: 401,
              message: 'Access denied',
            })
          )
        case 'NOT_FOUND':
          return next(
            prepareError({
              err,
              status: 404,
              message: 'Not found',
            })
          )
        case 'BAD_REQUEST':
          return next(
            prepareError({
              err,
              status: 400,
              message: 'Bad request',
            })
          )
      }
    }
  }

  // No extension code fall back to guessing:
  const errMessage = err.message && err.message.toLowerCase()

  if (
    contains(errMessage, [
      'not found', // Old-style errors
      "can't find", // New-style errors
      "couldn't find", // New-style errors
      'Variable id of type ID! was provided invalid value', // When bots try to access string paths on numeric ID typed queries
    ])
  ) {
    return next(
      prepareError({
        err,
        status: 404,
        message: 'Not found',
      })
    )
  }

  if (
    contains(errMessage, [
      'unauthorized', // Old-style errors
      'access denied', // Old-style errors
      'unable to', // New-style errors
      'requires sign in', // New-style errors
    ])
  ) {
    return next(
      prepareError({
        err,
        status: 401,
        message: 'Access denied',
      })
    )
  }

  if (contains(errMessage, ['Failed to decode param'])) {
    return next(
      prepareError({
        err,
        status: 400,
        message: 'Bad request',
      })
    )
  }

  return next(err)
}
