Backbone = require 'backbone'
{ QUERY, PROFILE_CHANNELS, SORT } = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
ChannelGroupView = require '../../../components/channel_block_group/view.coffee'

template = -> require('../templates/partials/_channel_groups.jade') arguments...

class ProfileView extends Backbone.View
  loading: false
  disabled: false
  threshold: -500
  page: 2

  initialize: ->
    @timer = setInterval @maybeLoad, 150

  maybeLoad: =>
    return false if @loading or 
      @disabled or 
      mediator.shared.state.get 'lightbox'

    total = document.body.scrollHeight
    scrollPos = (document.documentElement.scrollTop || document.body.scrollTop)
    progress = scrollPos + window.innerHeight * 4

    if (total - progress < @threshold)
      @loadNextPage() 

  loadNextPage: ->
    @loading = true
    $.ajax 
      data: 
        page: @page
        q: QUERY
        sort: SORT
      url: "/api/#{sd.USER.slug}/profile"
      success: (response) =>
        @page++
        @loading = false

        if response.channels.length
          $('.profile').append template 
            channels: response.channels
          
          @setUpChannelGroupViews(response.channels)
        else
          @disabled = true

  setUpChannelGroupViews: (channels) ->
    for channel in channels
      view = new ChannelGroupView
        channel: channel
        el: @$(".ChannelBlockGroup[data-id=#{channel.id}]")
      
      view.initBlockViews()
      
module.exports.init = ->
  view = new ProfileView
    el: $('.profile')

  view.setUpChannelGroupViews(PROFILE_CHANNELS)