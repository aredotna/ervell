import express from 'express'

import apolloMiddleware from 'v2/apollo/middleware'
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee'

import pageResolver from 'v2/components/UI/Page/resolver'
import Routes from 'apps/accept_invite/Routes'
import withStaticRouter from 'v2/hocs/WithStaticRouter'

const app = express()

const renderAcceptInvite = (req, res, next) => {
  return req.apollo
    .render(withStaticRouter(Routes), null, { mode: 'page' })
    .then(apolloRes => {
      pageResolver({
        bundleName: 'accept_invite',
        apolloRes,
        res,
      })
    })
    .catch(err => {
      next(err)
    })
}

app.get(
  '/i/:code',
  ensureLoggedInMiddleware,
  apolloMiddleware,
  renderAcceptInvite
)

module.exports = app
