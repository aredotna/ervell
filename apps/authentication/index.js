import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import layoutResolver from 'react/components/UI/Layout/resolver';

import logoutMiddleware from 'apps/authentication/middleware/logout';
import redirectToMiddleware from 'lib/middleware/redirect_to.coffee';
import setRedirectToMiddleware from 'lib/middleware/setRedirectTo';

import Routes from 'apps/authentication/Routes';

import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const refresh = (req, res, next) => {
  const { user } = req;

  if (!user) return next();

  const headers = {
    'X-AUTH-TOKEN': user.get('access_token'),
  };

  return user.fetch({ headers })
    .then((response) => {
      req.login(user, (err) => {
        if (err) return next(err);

        // IMPORTANT: return the `response` instead of the `user.toJSON()`
        // Why? Because `user.toJSON()` is already parsed. Returning
        // an already parsed response will make it unparesable.
        return res.json(response);
      });
    })
    .catch(next);
};

const render = (req, res, next) => {
  // Redirect to index if logged in
  if (req.user && req.user.id) {
    return res.redirect('/');
  }

  return req.apollo.render(withStaticRouter(Routes), null, { mode: 'layout' })
    .then((apolloRes) => {
      layoutResolver({
        bundleName: 'authentication',
        apolloRes,
        res,
      });
    }).catch(next);
};

app
  .get(
    /^\/(sign_up|log_in|forgot|register\/\w+|reset\/\w+)/,
    setRedirectToMiddleware,
    apolloMiddleware,
    render,
  )
  .get('/me/sign_out', logoutMiddleware, redirectToMiddleware)
  .get('/me/refresh', refresh);

module.exports = app;
