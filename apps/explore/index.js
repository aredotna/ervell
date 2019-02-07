import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';
import setSeedMiddleware from 'apps/profile/middleware/setSeed';

import Routes from 'apps/explore/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const middlewareStack = [
  setSeedMiddleware,
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes))
      .then((apollo) => {
        const view = req.path.split('/').pop();

        res.render('index', {
          apollo,
          view,
        });
      })
      .catch((err) => {
        next(err);
      });
  },
];

app.get('/explore', ...resolve);
app.get('/explore/all', ...resolve);
app.get('/explore/channels', ...resolve);
app.get('/explore/blocks', ...resolve);

module.exports = app;
