{ USER, PROFILE_CHANNELS } = require("sharify").data
ChannelsView = require './view.coffee'
ChannelGroups = require './collection.coffee'
Params = require './params.coffee'

module.exports = ->
  params = new Params() 

  collection = new ChannelGroups PROFILE_CHANNELS, 
    userSlug: USER.slug
    params: params

  view = new ChannelsView
    collection: collection,
    params: params
    el: $('.js-user-channels')

  view.setUpChannelGroupViews()

