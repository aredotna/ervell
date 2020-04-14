import express from 'express'

import apolloMiddleware from 'v2/apollo/middleware'
import ensureLoggedInMiddleware from 'lib/middleware/ensureLoggedIn'

import pageResolver from 'v2/components/UI/Page/resolver'
import Routes from 'apps/profile/Routes'
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
          bundleName: 'profile',
          apolloRes,
          res,
        })
      })
      .catch(next)
  },
]

app

app
  .get('/group/:id/invite/:code', ensureLoggedInMiddleware, ...resolve)
  .get('/:id/', ...resolve)
  .get('/:id/all', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve)
  .get('/:id/groups', ...resolve)
  .get('/:id/feed', ...resolve)
  .get('/:id/followers', ...resolve)
  .get('/:id/following', ...resolve)

module.exports = app
