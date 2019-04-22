import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import pageResolver from 'react/components/UI/Page/resolver';
import withStaticRouter from 'react/hocs/WithStaticRouter';

import Routes from 'apps/search/Routes';

const app = express();

const middlewareStack = [
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes), null, { mode: 'page' })
      .then((apolloRes) => {
        pageResolver({
          bundleName: 'search',
          apolloRes,
          res,
        });
      })
      .catch((err) => {
        next(err);
      });
  },
];

app.get('/search/:term', ...resolve);
app.get('/search/:term/all', ...resolve);
app.get('/search/:term/channels', ...resolve);
app.get('/search/:term/blocks', ...resolve);
app.get('/search/:term/users', ...resolve);
app.get('/search/:term/groups', ...resolve);

module.exports = app;
