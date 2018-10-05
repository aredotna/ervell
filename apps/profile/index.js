import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/profile/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const resolve = [
  apolloMiddleware, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes))
      .then((apollo) => {
        res.render('index', { apollo });
      })
      .catch(next);
  },
];

app
  .set('views', __dirname)
  .set('view engine', 'jade')

  .get('/:id/', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve);

module.exports = app;
