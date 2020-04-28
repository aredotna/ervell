import express from 'express'

import getFirstStatusCode from 'v2/util/getFirstStatusCode'

import apolloMiddleware from 'v2/apollo/middleware'
import homePathMiddleware from 'apps/feed/middleware/homePath'
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee'

import pageResolver from 'v2/components/UI/Page/resolver'
import Routes from 'apps/feed/Routes'
import withStaticRouter from 'v2/hocs/WithStaticRouter'

const app = express()

const renderFeed = (req, res, next) => {
  if (!req.user) {
    return next()
  }

  return req.apollo
    .render(withStaticRouter(Routes), null, { mode: 'page' })
    .then(apolloRes => {
      pageResolver({
        bundleName: 'feed',
        apolloRes,
        res,
      })
    })
    .catch(err => {
      const STATUS_CODE = getFirstStatusCode(err)

      if (STATUS_CODE === 'UNAUTHORIZED') {
        // This typically happens if the serialized user is "bad"
        // or not actually logged in. If so: logout, then redirect somewhere.
        // Falling through by using `next()` doesn't seem to actually purge the session.
        req.logout()
        return res.redirect('/log_in')
      }

      return next(err)
    })
}

const renderExplore = (req, res, next) => {
  req.apollo
    .render(withStaticRouter(Routes), null, { mode: 'page' })
    .then(apolloRes => {
      pageResolver({
        bundleName: 'feed',
        apolloRes,
        res,
      })
    })
    .catch(err => {
      next(err)
    })
}

// Feed
app.get('/', homePathMiddleware, apolloMiddleware, renderFeed)
app.get('/feed', ensureLoggedInMiddleware, apolloMiddleware, renderFeed)
app.get(
  '/notifications',
  ensureLoggedInMiddleware,
  apolloMiddleware,
  renderFeed
)

// Explore
app.get('/explore', apolloMiddleware, renderExplore)
app.get('/explore/all', apolloMiddleware, renderExplore)
app.get('/explore/channels', apolloMiddleware, renderExplore)
app.get('/explore/blocks', apolloMiddleware, renderExplore)

module.exports = app
