import express from 'express';

import ExploreBlocks from 'collections/explore_blocks.coffee';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import homePathMiddleware from 'apps/feed/middleware/homePath';
import setTipsMiddleware from 'apps/feed/middleware/setTips';
import setSortMiddleware from 'apps/feed/middleware/setSort';
import setSubjectModeMiddleware from 'apps/feed/middleware/setSubjectMode';

import HomeComponent from 'react/components/Home';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const setAndFetchBlocks = (req, res) => {
  const { SEED, SORT, SUBJECT } = res.locals.sd;

  const blocks = new ExploreBlocks([], {
    filter: SUBJECT,
    sort: SORT,
    seed: SEED,
  });

  return blocks.fetch()
    .then(() => {
      res.locals.sd.BLOCKS = blocks.toJSON();
      res.locals.blocks = blocks.models;
    });
};

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

  return res.render('feed');
};

const renderNotifications = (req, res) => {
  res.locals.sd.FEED_TYPE = 'notifications';
  res.locals.sd.CURRENT_ACTION = 'notifications';
  res.render('feed');
};

const renderExplore = (req, res, next) => {
  res.locals.sd.FEED_TYPE = 'explore';
  res.locals.sd.CURRENT_ACTION = 'explore';

  return setAndFetchBlocks(req, res)
    .then(() => res.render('explore'))
    .catch(next);
};

const middlewareStack = [
  apolloMiddleware,
  setHeaderMiddleware,
];

const exploreMiddlewareStack = [
  setSortMiddleware,
  setSubjectModeMiddleware,
];

app.get('/', homePathMiddleware, setTipsMiddleware, ...middlewareStack, renderFeed);
app.get('/feed', ensureLoggedInMiddleware, setTipsMiddleware, ...middlewareStack, renderFeed);
app.get('/notifications', ensureLoggedInMiddleware, ...middlewareStack, renderNotifications);
app.get('/explore', ...exploreMiddlewareStack, ...middlewareStack, renderExplore);
app.get('/explore/channels', ...exploreMiddlewareStack, ...middlewareStack, renderExplore);
app.get('/explore/blocks', ...exploreMiddlewareStack, ...middlewareStack, renderExplore);

module.exports = app;
