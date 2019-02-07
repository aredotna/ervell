import express from 'express';

import Routes from 'apps/search/Routes';

import apolloMiddleware from 'react/apollo/middleware';

import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');


const middlewareStack = [
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

app.get('/search/:term', ...resolve);
app.get('/search/:term/all', ...resolve);
app.get('/search/:term/channels', ...resolve);
app.get('/search/:term/blocks', ...resolve);
app.get('/search/:term/users', ...resolve);
app.get('/search/:term/groups', ...resolve);

module.exports = app;
