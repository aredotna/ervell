import { Router } from 'express'
import apolloMiddleware from 'v2/apollo/middleware'
import homePathMiddleware from 'apps/app/middleware/homePath'
import getFirstStatusCode from 'v2/util/getFirstStatusCode'

import pageResolver from 'v2/components/UI/Page/resolver'
import withStaticRouter from 'v2/hocs/WithStaticRouter'

import { AppRoutes as Routes } from './Routes'
import ensureLoggedIn from 'lib/middleware/ensureLoggedIn'
import createAuthenticatedService from 'apps/authentication/mutations/createAuthenticatedService'

export const App = Router()

const middlewareStack = [apolloMiddleware]

const redirectLoggedOutToPricing = (req, res, next) => {
  if (!req.user) {
    res.locals.sd.REDIRECT_TO = req.originalUrl
    return res.redirect(`/pricing`)
  }

  next()
}

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    const isLoggedIn = !!req.user?.id

    req.apollo
      .render(withStaticRouter(Routes), { isLoggedIn }, { mode: 'page' })
      .then(apolloRes => pageResolver({ bundleName: 'app', apolloRes, res }))
      .catch(err => {
        const STATUS_CODE = getFirstStatusCode(err)

        if (STATUS_CODE === 'UNAUTHORIZED' && req.url === '/') {
          // This typically happens if the serialized user is "bad"
          // or not actually logged in. If so: logout, then redirect somewhere.
          // Falling through by using `next()` doesn't seem to actually purge the session.
          req.logout()
          return res.redirect('/log_in')
        }

        return next(err)
      })
  },
]

const findFriendsCallback = (req, res, next) =>
  req.apollo.client
    .mutate({
      mutation: createAuthenticatedService,
      variables: req.query,
    })
    .then(() => res.redirect('/tools/find-friends?showModal=true'))
    .catch(next)

App.get(
  '/share/:token',
  (req, res, next) => {
    res.locals.sd.X_SHARE_TOKEN = req.params.token
    next()
  },
  middlewareStack,
  (req, res, next) => {
    req.apollo
      .render(withStaticRouter(Routes), {}, { mode: 'page' })
      .then(apolloRes => pageResolver({ bundleName: 'app', apolloRes, res }))
      .catch(next)
  }
)
  .get('/group/:id/invite/:code', ensureLoggedIn, ...resolve)
  .get(
    '/settings/:page(billing|group_billing|perks)?',
    redirectLoggedOutToPricing,
    ...resolve
  )
  .get('/settings', ensureLoggedIn, ...resolve)
  .get('/settings/*', ensureLoggedIn, ...resolve)
  .get(
    '/tools/find-friends/callback',
    apolloMiddleware,
    ensureLoggedIn,
    findFriendsCallback
  )
  .get('/tools/*', ensureLoggedIn, ...resolve)
  .get('/', homePathMiddleware, ...resolve)
  .get('*', ...resolve)
