import express from 'express';

import apolloMiddleware from 'v2/apollo/middleware';

import Routes from 'apps/block/Routes';

import pageResolver from 'v2/components/UI/Page/resolver';

import withStaticRouter from 'v2/hocs/WithStaticRouter';

const app = express();

const middlewareStack = [
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
      .then((apolloRes) => {
        pageResolver({
          bundleName: 'block',
          apolloRes,
          res,
        });
      })
      .catch(next);
  },
];

app
  .get('/block/:id', ...resolve);

module.exports = app;
