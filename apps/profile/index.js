import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/profile/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

app
  .set('views', __dirname)
  .set('view engine', 'jade')

  .get('/profile/:id', apolloMiddleware, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes))
      .then((apollo) => {
        res.render('index', { apollo });
      })
      .catch(next);
  });

module.exports = app;
