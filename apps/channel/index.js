import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';

import legacyChannelDataQuery from 'apps/channel/queries/legacyChannelData';

import ChannelComponent from 'react/components/Channel';

import ChannelModel from 'models/channel.coffee';

const app = express();

const show = (req, res, next) => {
  const { id } = req.params;
  const token = req.user && req.user.get('authentication_token');
  const channelModel = new ChannelModel({ id });

  Promise.all([
    req.apollo.render(ChannelComponent, { id }),
    req.apollo.client.query({ query: legacyChannelDataQuery, variables: { id } }),
    channelModel.fetch({ data: { auth_token: token } }),
  ])
    .then(([channelComponent, { data: { channel: { can, owner } } }]) => {
      if (channelModel.get('class') === 'User') {
        return res.redirect(301, `/${channelModel.get('slug')}`);
      }

      // Temp: For determining whether or not to show shadowed top bar.
      const isGroupPage = owner.__typename === 'Group';
      res.locals.isGroupPage = isGroupPage;
      res.locals.sd.IS_GROUP_PAGE = isGroupPage;

      res.locals.sd.CURRENT_ACTION = 'channel';
      res.locals.sd.CHANNEL = channelModel.toJSON();
      res.locals.sd.CAN = can;
      res.locals.sd.BLOCKS = channelModel.related().blocks.toJSON();

      return res.render('index', {
        can,
        channelComponent,
        channel: channelModel,
        author: channelModel.related().author,
        blocks: channelModel.related().blocks.models,
      });
    })
    .catch(next);
};

const embed = (req, res, next) => {
  const { id } = req.params;
  const token = req.user && req.user.get('authentication_token');
  const channel = new ChannelModel({ id });
  channel.url = `${channel.urlRoot()}?per=7&direction=desc`;

  channel.fetch({ cache: true, data: { auth_token: token } })
    .then(() => {
      res.locals.sd.CHANNEL = channel.toJSON();
      res.locals.sd.BLOCKS = channel.related().blocks.toJSON();
      res.render('embed', {
        channel,
        blocks: channel.related().blocks.models,
        author: channel.related().author,
        isEmbedded: true,
      });
    })
    .catch(next);
};

const followers = (req, res, next) => {
  const { id } = req.params;
  const token = req.user && req.user.get('authentication_token');
  const channelModel = new ChannelModel({ id });
  const can = { add_to: false, manage: false };

  Promise.all([
    req.apollo.render(ChannelComponent, { id }),
    channelModel.fetch({ data: { auth_token: token } }),
    channelModel.related().followers.fetch({ cache: true }),
  ])
    .then(([channelComponent]) => {
      if (channelModel.get('class') === 'User') {
        return res.redirect(301, `/${channelModel.get('slug')}`);
      }

      res.locals.sd.CURRENT_ACTION = 'channel_followers';
      res.locals.sd.CHANNEL = channelModel.toJSON();
      res.locals.sd.CAN = can;
      res.locals.sd.BLOCKS = channelModel.related().followers.toJSON();

      return res.render('index', {
        can,
        channelComponent,
        followers: true,
        channel: channelModel,
        author: channelModel.related().author,
        blocks: channelModel.related().followers.models,
      });
    })
    .catch(next);
};

app
  .set('views', `${__dirname}/templates`)
  .set('view engine', 'jade')
  .get('/:username/:id', apolloMiddleware, show)
  .get('/:username/:id/block/:block_id', show)
  .get('/:username/:id/embed', embed)
  .get('/:username/:id/followers', apolloMiddleware, followers);

module.exports = app;
