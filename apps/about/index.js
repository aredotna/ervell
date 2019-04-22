import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import client from 'lib/contentful';

import EducationPage from 'react/pages/about/EducationPage';
import GroupsPage from 'react/pages/about/GroupsPage';
import PricingPage from 'react/pages/about/PricingPage';
import RoadmapPage from 'react/pages/about/RoadmapPage';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const middlewareStack = [
  apolloMiddleware,
];

const ROADMAP_ENTRY_ID = 'XIpMMSAIWz0OlWhW7GEUy';

const resolveRoadmap = (req, res, next) => client
  .getEntry(ROADMAP_ENTRY_ID)
  .then(entry => req.apollo.render(RoadmapPage, { roadmap: entry }))
  .then((apollo) => {
    res.render('roadmap', { apollo });
  })
  .catch(next);

app
  .get('/about', (req, res) => res.render('index'))
  .get('/terms', (req, res) => res.render('terms'))
  .get('/privacy', (req, res) => res.render('privacy'))
  .get('/faqs', (req, res) => res.render('faqs'))
  .get('/experiments', (req, res) => res.render('experiments'))
  .get('/community-guidelines', (req, res) => res.render('community'))
  .get('/thankyou', (req, res) => res.render('thankyou'))
  .get('/roadmap', ...middlewareStack, resolveRoadmap)
  .get('/pricing', ...middlewareStack, (req, res) => req.apollo.render(PricingPage)
    .then(apollo => res.render('pricing', { apollo })))
  .get('/getting-started-with-groups', ...middlewareStack, (req, res) => req.apollo.render(GroupsPage)
    .then(apollo => res.render('groups', { apollo })))
  .get('/education', ...middlewareStack, (req, res) => req.apollo.render(EducationPage)
    .then(apollo => res.render('education', { apollo })));

module.exports = app;
