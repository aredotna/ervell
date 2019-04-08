import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/new_channel/Routes';

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
          bundleName: 'new_channel',
          apolloRes,
          res,
        });
      })
      .catch(next);
  },
];

app
  .get('/new_channel/:user_id/:channel_id', ...resolve);

module.exports = app;
