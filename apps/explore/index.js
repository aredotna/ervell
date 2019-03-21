import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';
import setSeedMiddleware from 'apps/profile/middleware/setSeed';

import Routes from 'apps/explore/Routes';

import pageResolver from 'react/components/UI/Page/resolver';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const middlewareStack = [
  setSeedMiddleware,
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
      .then((apolloRes) => {
        pageResolver({
          bundleName: 'explore',
          apolloRes,
          res,
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
