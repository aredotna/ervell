import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';

import { StaticRoutes } from './client/index';

const middlewareStack = [
  apolloMiddleware,
];

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

app
  .get(/^\/(sign_up|log_in|forgot)/, ...middlewareStack, (req, res) => req.apollo.render(StaticRoutes).then(apollo => res.render('index', { apollo })));

module.exports = app;
