import { Router } from 'express'
import apolloMiddleware from 'v2/apollo/middleware'
import homePathMiddleware from 'apps/app/middleware/homePath'

import pageResolver from 'v2/components/UI/Page/resolver'
import withStaticRouter from 'v2/hocs/WithStaticRouter'

import { Routes } from './Routes'
import ensureLoggedIn from 'lib/middleware/ensureLoggedIn'

export const App = Router()

const middlewareStack = [apolloMiddleware]

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    req.apollo
      .render(withStaticRouter(Routes), null, { mode: 'page' })
      .then(apolloRes => {
        pageResolver({ bundleName: 'app', apolloRes, res })
      })
      .catch(next)
  },
]

App.get(
  '/share/:token',
  (req, res, next) => {
    res.locals.sd.X_SHARE_TOKEN = req.params.token
    next()
  },
  ...resolve
)
  .get('/tools/*', ensureLoggedIn, ...resolve)
  .get('/', homePathMiddleware, ...resolve)
  .get('*', ...resolve)
