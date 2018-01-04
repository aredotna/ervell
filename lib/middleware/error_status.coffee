contains = (x, y) =>
  x.toLowerCase().indexOf(y.toLowerCase()) >= 0

module.exports = (err, req, res, next) ->
  error = null

  if contains(err.message, 'not found')
    error = new Error
    error.status = 404
    error.message = 'Not found'

  if contains(err.message, 'unauthorized') or contains(err.message, 'access denied')
    error = new Error
    error.status = 401
    error.message = 'Access Denied'

  next(error or err)
