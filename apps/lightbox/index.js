import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/lightbox/Routes';

import pageResolver from 'react/components/UI/Page/resolver';

import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const middlewareStack = [
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
      .then((apolloRes) => {
        pageResolver({
          bundleName: 'lightbox',
          apolloRes,
          res,
        });
      })
      .catch(next);
  },
];

app
  .get('/lightbox/:id', ...resolve);

module.exports = app;
