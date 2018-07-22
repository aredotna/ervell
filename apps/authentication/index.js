import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';

import { Routes } from './client/index';

const middlewareStack = [
  apolloMiddleware,
];

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

app
  .get('/log_in', ...middlewareStack, (req, res) => req.apollo.render(Routes).then(apollo => res.render('index', { apollo })));

// .get '/sign_up', routes.sign_up
// .get '/log_in', routes.log_in

// .get '/forgot', routes.forgot
// .get '/reset/:token', routes.reset
module.exports = app;
