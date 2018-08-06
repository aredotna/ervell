import express from 'express';
import SearchBlocks from '../../collections/search_blocks';
import { extend } from 'underscore';
import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import setOnboardingComponentMiddleware from 'apps/onboarding/middleware/setOnboardingComponent';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const renderOnboarding = (req, res, next) => {
  res.render('index');
};

const middlewareStack = [
  ensureLoggedInMiddleware,
  apolloMiddleware,
  setOnboardingComponentMiddleware
];

app.get('/welcome', ...middlewareStack, renderOnboarding);

module.exports = app;
