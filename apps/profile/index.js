import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import setSeedMiddleware from 'apps/profile/middleware/setSeed';

import pageResolver from 'react/components/UI/Page/resolver';

import Routes from 'apps/profile/Routes';

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
          bundleName: 'profile',
          apolloRes,
          res,
        });
      })
      .catch(next);
  },
];

app
  .get('/:id/', ...resolve)
  .get('/:id/all', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve)
  .get('/:id/groups', ...resolve)
  .get('/:id/followers', ...resolve)
  .get('/:id/following', ...resolve);

module.exports = app;
