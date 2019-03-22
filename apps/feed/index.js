import express from 'express';

import getFirstStatusCode from 'react/util/getFirstStatusCode';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';

import pageResolver from 'react/components/UI/Page/resolver';
import Routes from 'apps/feed/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

import createAuthenticatedService from 'apps/feed/mutations/createAuthenticatedService';

const app = express();

const render = (req, res, next) => {
  req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
    .then((apolloRes) => {
      pageResolver({
        bundleName: 'feed',
        apolloRes,
        res,
      });
    })
    .catch((err) => {
      const STATUS_CODE = getFirstStatusCode(err);

      if (STATUS_CODE === 'UNAUTHORIZED') {
        // This typically happens if the serialized user is "bad"
        // or not actually logged in. If so: logout, then redirect somewhere.
        // Falling through by using `next()` doesn't seem to actually purge the session.
        req.logout();
        return res.redirect('/log_in');
      }

      return next(err);
    });
};

const findFriendsCallback = (req, res, next) =>
  req.apollo.client.mutate({
    mutation: createAuthenticatedService,
    variables: req.query,
  })
    .then(() => res.redirect('/?showModal=true'))
    .catch(next);

app.get('/', ensureLoggedInMiddleware, apolloMiddleware, render);
app.get('/feed', ensureLoggedInMiddleware, apolloMiddleware, render);
app.get('/notifications', ensureLoggedInMiddleware, apolloMiddleware, render);
app.get('/feed/find-friends/callback', apolloMiddleware, ensureLoggedInMiddleware, findFriendsCallback);

module.exports = app;
