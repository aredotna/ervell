import express from 'express';
import useragent from 'useragent';

import apolloMiddleware from 'v2/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';

import bookmarklet from 'lib/bookmarklet.coffee';

import createAuthenticatedService from 'apps/feed/mutations/createAuthenticatedService';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const renderTools = (req, res) => {
  if (!req.params.tab) {
    return res.redirect('/tools/bookmarklet');
  }

  if (req.params.tab === 'manage') {
    return res.redirect('/manage');
  }

  if (req.params.tab === 'premium') {
    return res.redirect('/pricing');
  }

  const { tab } = req.params;

  res.locals.sd.TAB = tab;

  return res.render('index', {
    tab,
    bookmarklet,
    isChrome: useragent.is(req.headers['user-agent']).chrome,
  });
};

const findFriendsCallback = (req, res, next) =>
  req.apollo.client.mutate({
    mutation: createAuthenticatedService,
    variables: req.query,
  })
    .then(() => res.redirect('/tools/find-friends?showModal=true'))
    .catch(next);

app.get('/tools', ensureLoggedInMiddleware, renderTools);
app.get('/tools/:tab', ensureLoggedInMiddleware, renderTools);
app.get('/tools/find-friends/callback', apolloMiddleware, ensureLoggedInMiddleware, findFriendsCallback);

module.exports = app;
