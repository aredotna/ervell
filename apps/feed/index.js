import express from 'express';

import ExploreBlocks from 'collections/explore_blocks.coffee';

import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import homePathMiddleware from 'apps/feed/middleware/homePath';
import setTipsMiddleware from 'apps/feed/middleware/setTips';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const generateSeed = () =>
  Math.floor(Math.random() * 100000000) + 1;

const setAndFetchBlocks = (options = {}) => (req, res) => {
  const blocks = new ExploreBlocks([], options);

  return blocks.fetch()
    .then(() => {
      res.locals.sd.SORT = options.sort;
      res.locals.sd.SEED = options.seed;
      res.locals.sd.SUBJECT = options.filter;
      res.locals.sd.BLOCKS = blocks.toJSON();
      res.locals.blocks = blocks.models;
    });
};

const renderIndex = (req, res, next) => {
  if (!req.user) return next();

  res.locals.sd.CURRENT_ACTION = 'feed';
  res.locals.sd.CURRENT_PATH = '/';
  res.locals.sd.FEED_TYPE = 'primary';

  return res.render('feed', {
    path: 'Feed',
  });
};

app.get('/', homePathMiddleware, setTipsMiddleware, renderIndex);
app.get('/feed', ensureLoggedInMiddleware, setTipsMiddleware, renderIndex);

app.get('/notifications', ensureLoggedInMiddleware, (req, res) => {
  res.locals.sd.FEED_TYPE = 'notifications';
  res.render('feed', {
    path: 'Notifications',
  });
});

app.get('/explore', (req, res, next) => {
  res.locals.sd.CURRENT_ACTION = 'explore';

  return setAndFetchBlocks({ sort: req.query.sort })(req, res)
    .then(() => res.render('explore'))
    .catch(next);
});

app.get('/explore/channels', (req, res, next) => {
  res.locals.sd.CURRENT_ACTION = 'explore';

  return setAndFetchBlocks({
    filter: 'channel',
    sort: req.query.sort,
    seed: generateSeed(),
  })(req, res)
    .then(() => res.render('explore'))
    .catch(next);
});

app.get('/explore/blocks', (req, res, next) => {
  res.locals.sd.CURRENT_ACTION = 'explore';

  return setAndFetchBlocks({
    filter: 'block',
    sort: req.query.sort,
    seed: generateSeed(),
  })(req, res)
    .then(() => res.render('explore'))
    .catch(next);
});

module.exports = app;
