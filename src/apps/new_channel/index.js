import express from 'express'

import apolloMiddleware from 'v2/apollo/middleware'

import Routes from 'apps/new_channel/Routes'

import pageResolver from 'v2/components/UI/Page/resolver'

import withStaticRouter from 'v2/hocs/WithStaticRouter'

const app = express()

const middlewareStack = [apolloMiddleware]

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    req.apollo
      .render(withStaticRouter(Routes), null, { mode: 'page' })
      .then(apolloRes => {
        pageResolver({
          bundleName: 'new_channel',
          apolloRes,
          res,
        })
      })
      .catch(next)
  },
]

app
  .get(
    '/share/:token',
    (req, res, next) => {
      res.locals.sd.X_SHARE_TOKEN = req.params.token
      next()
    },
    ...resolve
  )
  .get('/:user_id/:channel_id', ...resolve)
  .get('/:user_id/:channel_id/followers', ...resolve)
  .get('/:user_id/:channel_id/embed', ...resolve)

module.exports = app
