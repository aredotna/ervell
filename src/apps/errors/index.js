import path from 'path'
import debug from 'debug'

import { NODE_ENV } from 'config.coffee'

const logger = debug('error')

// eslint-disable-next-line no-unused-vars
export default (err, req, res, _next) => {
  logger(err.stack)

  const status = err.status || 500
  const isVisible = NODE_ENV === 'development'

  const response = {
    code: status,
    message: isVisible ? err.message : 'Internal server error',
    stack: isVisible ? err.stack : null,
  }

  res.status(status)

  if (req.accepts('html')) {
    const template = path.resolve(__dirname, './index.jade')
    return res.render(template, response)
  }

  return res.send(response)
}
