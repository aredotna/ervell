import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedIn from 'lib/middleware/ensure_logged_in.coffee';
import to from 'lib/to.coffee';

import hasGroupsQuery from 'apps/settings/queries/hasGroupsQuery';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const validTabs = [
  'general',
  'notifications',
  'billing',
  'group_billing',
];

const validateTab = (req, res, next) => (validTabs.includes(req.params.tab) ? next() : res.redirect('/settings'));

const resolve = (req, res, next) => {
  const { user } = req;
  const { policy } = user.related();

  policy.authenticate(user.get('access_token'));

  const headers = {
    'X-AUTH-TOKEN': user.get('access_token'),
  };

  Promise.all([
    user.fetch({ headers }),
    policy.fetch(),
    req.apollo.client.query({ query: hasGroupsQuery }),
  ]).then(([_x, _y, { data: { me: { groups } } }]) => {
    res.locals.sd.USER = user.toJSON();
    res.locals.sd.POLICY = policy.toJSON();
    res.locals.hasGroups = groups.length > 0;

    res.render('index', {
      tab: req.params.tab,
      user,
      policy,
    });
  }).catch(next);
};

app.get('/settings', ensureLoggedIn, to(`/settings/${validTabs[0]}`));
app.get('/settings/:tab', apolloMiddleware, validateTab, ensureLoggedIn, resolve);

module.exports = app;
