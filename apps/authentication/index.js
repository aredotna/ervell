import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';

import logout from './middleware/logout';
import redirectTo from '../../lib/middleware/redirect_to';

import { StaticRoutes } from './client/index';

const middlewareStack = [
  apolloMiddleware,
];

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

app.get(/^\/(sign_up|log_in|forgot)/, ...middlewareStack, (req, res) => {
  if (req.user && req.user.id) { return res.redirect('/'); }

  res.locals.sd.REDIRECT_TO = req.query['redirect-to'] || '/';

  return req.apollo.render(StaticRoutes)
    .then(apollo => res.render('index', { apollo }));
});

app.get('/me/sign_out', logout, redirectTo);
app.get('/me/refresh', (req, res, next) => {
  if (!req.user || !req.user.id) { return next(); }
  const { user } = req;
  return Promise(user.fetch())
    .then((response) => {
      req.login(user, (err) => {
        if (err) { return next(err); }

        // IMPORTANT: return the `response` instead of the `user.toJSON()`
        // Why? Because `user.toJSON()` is already parsed. Returning
        // an already parsed response will make it unparesable.
        return req.json(response);
      });
    }).catch(next);
});

module.exports = app;
