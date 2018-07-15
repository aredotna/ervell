import express from 'express';
import SearchBlocks from '../../collections/search_blocks';
import { data as sd } from 'sharify';
import { extend } from 'underscore';
import apolloMiddleware from 'react/apollo/middleware';
import setModeMiddleware from './middleware/setMode';
import setSearchMiddleware from './middleware/setSearch';
import setHeaderMiddleware from './middleware/setHeader';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const renderSearch = (req, res, next) => {
  const blocks = new SearchBlocks();
  const search = res.locals.sd.SEARCH;

  if (req.query.subject) {
    extend(blocks.options, { subject: req.query.subject });
    res.locals.sd.SUBJECT = req.query.subject;
  }

  res.locals.sd.CURRENT_ACTION = 'search';

  return blocks.fetch({
    data: {
      q: search,
      auth_token: req.user && req.user.get('authentication_token')
    },
    success: (blocks, response, options) => {
      res.locals.sd.BLOCKS = blocks.toJSON();
      res.render('index', { blocks: blocks.models, search: search });
    },
    error: (m, err) => {
      next(err);
    }
  });
};

const renderSearchChannels = (req, res, next) => {
  req.query = {};
  req.query.subject = 'channels';
  renderSearch(req, res, next);
}

const renderSearchBlocks = (req, res, next) => {
  req.query = {};
  req.query.subject = 'blocks';
  renderSearch(req, res, next);
}

const renderSearchUsers = (req, res, next) => {
  req.query = {};
  req.query.subject = 'users';
  renderSearch(req, res, next);
}

const middlewareStack = [
  setModeMiddleware,
  setSearchMiddleware,
  apolloMiddleware,
  setHeaderMiddleware
];

app.get('/search/:query', ...middlewareStack, renderSearch);
app.get('/search/:query/channels', ...middlewareStack, renderSearchChannels);
app.get('/search/:query/blocks', ...middlewareStack, renderSearchBlocks);
app.get('/search/:query/users', ...middlewareStack, renderSearchUsers);

module.exports = app;
