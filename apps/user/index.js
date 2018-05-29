import express from 'express';

import UserModel from 'models/user.coffee';
import UserBlocksCollection from 'collections/user_blocks.coffee';
import FollowBlocksCollection from 'collections/follow_blocks.coffee';

import apolloMiddleware from 'react/apollo/middleware';
import setSortMiddleware from 'apps/user/middleware/setSort';
import setSubjectModeMiddleware from 'apps/user/middleware/setSubjectMode';
import redirectModeMiddleware from 'apps/user/middleware/redirectMode';
import setTipsMiddleware from 'apps/user/middleware/setTips';

import ProfileComponent from 'react/components/Profile';

import graphQL from 'lib/graphql.coffee';
import PROFILE_CHANNELS_QUERY from 'apps/user/queries/profile.coffee';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

// Fetches
const getToken = req =>
  (req.user ? req.user.get('authentication_token') : null);

const fetchAndSetBlocks = (req, res) => {
  const { SEED, SORT, SUBJECT } = res.locals.sd;
  const auth_token = getToken(req);

  const blocksCollection = new UserBlocksCollection([], {
    user_slug: req.params.id,
    sort: SORT,
    seed: SEED,
    subject: SUBJECT,
  });

  return blocksCollection.fetch({ data: { auth_token } })
    .then(() => {
      res.locals.sd.BLOCKS = blocksCollection.toJSON();
      res.locals.blocks = blocksCollection.models;
    });
};

const fetchAndSetChannelsIndex = (req, res) => {
  const auth_token = getToken(req);

  const channelsCollection = new UserBlocksCollection([], {
    user_slug: req.params.id,
    subject: 'channels',
  });

  return channelsCollection.fetchUntilEnd({
    data: { auth_token },
  })
    .then(() => {
      const alpha = channelsCollection.groupByAlpha();

      res.locals.sd.ALPHA = alpha;
      res.locals.alpha = alpha;
      res.locals.channelsCount = channelsCollection.length;
    });
};

const fetchAndSetProfileModel = (req, res) => {
  const profileModel = new UserModel({
    id: req.params.id,
  });

  return profileModel.fetch({ cache: true })
    .then(() => {
      res.locals.sd.USER = profileModel.toJSON();
      res.locals.author = profileModel;
    });
};

const fetchAndSetProfileHeader = (req, res) => {
  res.locals.sd.CURRENT_ACTION = 'profile';

  const { SORT, MODE } = res.locals.sd;

  return req.apollo.render(ProfileComponent, {
    id: req.params.id,
    sort: SORT,
    mode: MODE,
  })
    .then((profileComponent) => {
      res.locals.profileComponent = profileComponent;
    });
};

const fetchAndSetChannels = (req, res) => {
  const send = {
    query: PROFILE_CHANNELS_QUERY,
    user: req.user,
    variables: {
      id: req.params.id,
      per: 2,
      perBlocks: 5,
      page: parseInt(req.query.page || 1, 10),
      q: req.query.q,
      sort: res.locals.sd.SORT.toUpperCase() || 'UPDATED_AT',
    },
  };

  return graphQL(send)
    .then(({ user: { contents } }) => {
      res.locals.sd.QUERY = req.query.q;
      res.locals.sd.PROFILE_CHANNELS = contents;
      res.locals.channels = contents;
      return contents;
    });
};

const fetchAndSetFollow = suffix => (req, res) => {
  const auth_token = getToken(req);

  const followBlocksCollection = new FollowBlocksCollection([], {
    object_id: req.params.id,
    object_type: 'users',
    suffix,
  });

  return followBlocksCollection.fetch({
    data: { per: 25, auth_token },
  }).then(() => {
    res.locals.sd.BLOCKS = followBlocksCollection.toJSON();
    res.locals.blocks = followBlocksCollection.models;
    res.locals.sd.SUFFIX = suffix;
    res.locals.followers = true;
  });
};

// Pages
const show = (req, res, next) => {
  Promise.all([
    fetchAndSetProfileModel(req, res),
    fetchAndSetProfileHeader(req, res),
    fetchAndSetBlocks(req, res),
  ])
    .then(() => res.render('show'))
    .catch(next);
};

const channels = (req, res, next) => {
  Promise.all([
    fetchAndSetProfileModel(req, res),
    fetchAndSetProfileHeader(req, res),
    fetchAndSetChannels(req, res),
  ])
    .then(() => res.render('channels'))
    .catch(next);
};

const index = (req, res, next) => {
  Promise.all([
    fetchAndSetProfileModel(req, res),
    fetchAndSetProfileHeader(req, res),
    fetchAndSetChannelsIndex(req, res),
  ])
    .then(() => res.render('index'))
    .catch(next);
};

const follow = suffix => (req, res, next) => {
  if (!req.user) { return res.redirect(301, '/sign_up'); }

  return Promise.all([
    fetchAndSetProfileModel(req, res),
    fetchAndSetProfileHeader(req, res),
    fetchAndSetFollow(suffix)(req, res),
  ])
    .then(() => res.render('show'))
    .catch(next);
};

const channelsApi = (req, res, next) => {
  fetchAndSetChannels(req, res)
    .then(contents => res.send({ channels: contents }))
    .catch(next);
};

const middlewareStack = [
  apolloMiddleware,
  setSortMiddleware,
  setSubjectModeMiddleware,
  setTipsMiddleware,
];

app.get('/:id', redirectModeMiddleware, ...middlewareStack, show);
app.get('/:id/channels', ...middlewareStack, channels);
app.get('/:id/blocks', ...middlewareStack, show);
app.get('/:id/index', ...middlewareStack, index);
app.get('/:id/followers', ...middlewareStack, follow('ers'));
app.get('/:id/following', ...middlewareStack, follow('ing'));
app.get('/api/:id/channels', ...middlewareStack, channelsApi);

module.exports = app;
