import express from 'express'

import apolloMiddleware from 'v2/apollo/middleware'

import pageResolver from 'v2/components/UI/Page/resolver'

import logoutMiddleware from 'apps/authentication/middleware/logout'
import redirectToMiddleware from 'lib/middleware/redirect_to.coffee'
import setRedirectToMiddleware from 'lib/middleware/setRedirectTo'
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee'

import Routes from 'apps/authentication/Routes'

import withStaticRouter from 'v2/hocs/WithStaticRouter'

import createAuthenticatedService from 'apps/authentication/mutations/createAuthenticatedService'

const app = express()

const refresh = (req, res, next) => {
  const { user } = req

  if (!user) return next()

  const headers = {
    'X-AUTH-TOKEN': user.get('access_token'),
  }

  return user
    .fetch({ headers })
    .then(response => {
      req.login(user, err => {
        if (err) return next(err)

        // IMPORTANT: return the `response` instead of the `user.toJSON()`
        // Why? Because `user.toJSON()` is already parsed. Returning
        // an already parsed response will make it unparesable.
        return res.json(response)
      })
    })
    .catch(next)
}

const render = (req, res, next) => {
  // Redirect to index if logged in
  if (req.user && req.user.id) {
    return res.redirect('/')
  }

  return req.apollo
    .render(withStaticRouter(Routes), null, { mode: 'page' })
    .then(apolloRes => {
      pageResolver({
        bundleName: 'authentication',
        apolloRes,
        res,
      })
    })
    .catch(next)
}

const findFriendsCallback = (req, res, next) =>
  req.apollo.client
    .mutate({
      mutation: createAuthenticatedService,
      variables: req.query,
    })
    .then(() => res.redirect('/?showModal=true'))
    .catch(next)

app
  .get(
    /^\/(sign_up|log_in|forgot|register\/\w+|reset\/\w+)/,
    setRedirectToMiddleware,
    apolloMiddleware,
    render
  )
  .post('/me/sign_out', logoutMiddleware, redirectToMiddleware)
  .get('/me/refresh', refresh)
  .get(
    '/feed/find-friends/callback',
    apolloMiddleware,
    ensureLoggedInMiddleware,
    findFriendsCallback
  )
  .get(
    '/find-friends/callback',
    apolloMiddleware,
    ensureLoggedInMiddleware,
    findFriendsCallback
  )

module.exports = app
