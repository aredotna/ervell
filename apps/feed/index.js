import express from 'express';

import getFirstStatusCode from 'react/util/getFirstStatusCode';

import apolloMiddleware from 'react/apollo/middleware';
import setSeedMiddleware from 'apps/profile/middleware/setSeed';
import homePathMiddleware from 'apps/feed/middleware/homePath';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';

import pageResolver from 'react/components/UI/Page/resolver';
import Routes from 'apps/feed/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

import createAuthenticatedService from 'apps/feed/mutations/createAuthenticatedService';

const app = express();

const renderFeed = (req, res, next) => {
  if (!req.user) { return next(); }

  return req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
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

const renderExplore = (req, res, next) => {
  req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
    .then((apolloRes) => {
      pageResolver({
        bundleName: 'feed',
        apolloRes,
        res,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const findFriendsCallback = (req, res, next) =>
  req.apollo.client.mutate({
    mutation: createAuthenticatedService,
    variables: req.query,
  })
    .then(() => res.redirect('/?showModal=true'))
    .catch(next);

// Feed
app.get('/', homePathMiddleware, apolloMiddleware, renderFeed);
app.get('/feed', ensureLoggedInMiddleware, apolloMiddleware, renderFeed);
app.get('/notifications', ensureLoggedInMiddleware, apolloMiddleware, renderFeed);

// Explore
app.get('/explore', apolloMiddleware, setSeedMiddleware, renderExplore);
app.get('/explore/all', apolloMiddleware, setSeedMiddleware, renderExplore);
app.get('/explore/channels', apolloMiddleware, setSeedMiddleware, renderExplore);
app.get('/explore/blocks', apolloMiddleware, setSeedMiddleware, renderExplore);

// Find friends
app.get('/feed/find-friends/callback', apolloMiddleware, ensureLoggedInMiddleware, findFriendsCallback);

module.exports = app;
