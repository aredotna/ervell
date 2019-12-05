import express from 'express'

import ensureLoggedIn from 'lib/middleware/ensure_logged_in.coffee'

import apolloMiddleware from 'v2/apollo/middleware'
import pageResolver from 'v2/components/UI/Page/resolver'
import withStaticRouter from 'v2/hocs/WithStaticRouter'

import Routes from 'apps/settings/Routes'

const app = express()

const middlewareStack = [ensureLoggedIn, apolloMiddleware]

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    req.apollo
      .render(withStaticRouter(Routes), null, { mode: 'page' })
      .then(apolloRes => {
        pageResolver({
          bundleName: 'settings',
          apolloRes,
          res,
        })
      })
      .catch(next)
  },
]

app
  .get('/settings', middlewareStack, ...resolve)
  .get('/settings/:tab', middlewareStack, ...resolve)

module.exports = app
