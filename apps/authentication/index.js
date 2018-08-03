import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';

import logoutMiddleware from 'apps/authentication/middleware/logout';
import redirectToMiddleware from 'lib/middleware/redirect_to.coffee';

import Routes from 'apps/authentication/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

app
  .set('views', `${__dirname}/templates`)
  .set('view engine', 'jade')

  .get(/^\/(sign_up|log_in|forgot|register\/\w+)/, apolloMiddleware, (req, res, next) => {
    if (req.user && req.user.id) return res.redirect('/');

    res.locals.sd.REDIRECT_TO = req.query['redirect-to'] || '/';

    return req.apollo.render(withStaticRouter(Routes))
      .then(apollo => res.render('index', { apollo }))
      .catch(next);
  })
  .get('/me/sign_out', logoutMiddleware, redirectToMiddleware)
  .get('/me/refresh', (req, res, next) => {
    const { user } = req;

    if (!user) return next();

    return user.fetch()
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
  });

module.exports = app;
