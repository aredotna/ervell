import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import EducationPage from 'react/pages/about/EducationPage';
import GroupsPage from 'react/pages/about/GroupsPage';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const middlewareStack = [
  apolloMiddleware,
];

app
  .get('/about', (req, res) => res.render('index'))
  .get('/terms', (req, res) => res.render('terms'))
  .get('/privacy', (req, res) => res.render('privacy'))
  .get('/faqs', (req, res) => res.render('faqs'))
  .get('/pricing', (req, res) => res.render('pricing'))
  .get('/experiments', (req, res) => res.render('experiments'))
  .get('/community-guidelines', (req, res) => res.render('community-guidelines'))
  .get('/thankyou', (req, res) => res.render('thankyou'))
  .get('/getting-started-with-groups', ...middlewareStack, (req, res) => req.apollo.render(GroupsPage)
    .then(apollo => res.render('groups', { apollo })))
  .get('/education', ...middlewareStack, (req, res) => req.apollo.render(EducationPage)
    .then(apollo => res.render('education', { apollo })));

module.exports = app;
