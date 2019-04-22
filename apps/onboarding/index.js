import express from 'express';
import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import OnboardingComponent from 'react/components/Onboarding';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const renderOnboarding = (req, res, next) => {
  req.apollo.render(OnboardingComponent, {})
    .then((onboardingComponent) => {
      res.locals.onboardingComponent = onboardingComponent;
      res.render('index');
    })
    .catch(next);
};

const renderBilling = (req, res) => {
  res.render('billing');
};

const middlewareStack = [
  ensureLoggedInMiddleware,
  apolloMiddleware,
];

app.get('/welcome', ...middlewareStack, renderOnboarding);
app.get('/welcome/billing', ...middlewareStack, renderBilling);

module.exports = app;
