import express from 'express';

import getFirstStatusCode from 'react/util/getFirstStatusCode';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import homePathMiddleware from 'apps/feed/middleware/homePath';
import setTipsMiddleware from 'apps/feed/middleware/setTips';
import HomeComponent from 'react/components/Home';
import EmptyConnectTwitter from 'react/pages/feed/components/EmptyConnectTwitter';
import NoFollowingMessage from 'react/pages/feed/components/NoFollowingMessage';

import createAuthenticatedService from 'apps/feed/mutations/createAuthenticatedService';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const setHeaderMiddleware = (req, res, next) => {
  const { SORT, MODE } = res.locals.sd;

  return req.apollo.render(HomeComponent, {
    sort: SORT,
    mode: MODE,
  })
    .then((homeComponent) => {
      res.locals.homeComponent = homeComponent;
      next();
    })
    .catch(next);
};

const renderFeed = (req, res, next) => {
  if (!req.user) return next();

  res.locals.sd.CURRENT_ACTION = 'feed';
  res.locals.sd.CURRENT_PATH = '/';
  res.locals.sd.FEED_TYPE = 'primary';

  return Promise.all([
    req.apollo.render(EmptyConnectTwitter),
    req.apollo.render(NoFollowingMessage),
  ])
    .then(([emptyConnectTwitter, noFollowingMessage]) => {
      res.locals.emptyConnectTwitter = emptyConnectTwitter;
      res.locals.noFollowingMessage = noFollowingMessage;

      // Show the empty component if the person isn't following anyone
      // and they haven't cancelled out of the notice
      res.locals.showEmpty = (
        req.user.get('following_count') <= 1 &&
        !req.user.get('flags').has_seen_feed_connect_twitter
      );

      return res.render('feed');
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

const renderNotifications = (_req, res) => {
  res.locals.sd.FEED_TYPE = 'notifications';
  res.locals.sd.CURRENT_ACTION = 'notifications';
  res.render('feed');
};

const findFriendsCallback = (req, res, next) =>
  req.apollo.client.mutate({
    mutation: createAuthenticatedService,
    variables: req.query,
  })
    .then(() => res.redirect('/?showModal=true'))
    .catch(next);

const middlewareStack = [
  apolloMiddleware,
  setHeaderMiddleware,
];


app.get('/', homePathMiddleware, setTipsMiddleware, ...middlewareStack, renderFeed);
app.get('/feed', ensureLoggedInMiddleware, setTipsMiddleware, ...middlewareStack, renderFeed);
app.get('/notifications', ensureLoggedInMiddleware, ...middlewareStack, renderNotifications);
app.get('/feed/find-friends/callback', apolloMiddleware, ensureLoggedInMiddleware, findFriendsCallback);

module.exports = app;
