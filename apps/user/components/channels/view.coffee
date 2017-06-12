Backbone = require 'backbone'
{ throttle, invoke } = require 'underscore'
Promise = require 'bluebird-q'
{ QUERY, SORT } = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
ChannelGroupView = require '../../../../components/channel_block_group/view.coffee'

template = -> require('./groups.jade') arguments...
channelGroupTemplate = -> require('../../../../components/channel_block_group/templates/index.jade') arguments...

module.exports = class ProfileView extends Backbone.View
  threshold: -500
  interval: 150

  events: 
    'keyup .js-channel-filter' : 'searchChannels'

  initialize: ({ @collection, @params }) ->
    @timer = setInterval @maybeLoad, @interval
    @user = CurrentUser.orNull()
    @subviews = []

    @searchChannels = throttle(@searchChannels, 100)

    @state = new Backbone.Model
      loading: false
      disabled: false

    @listenTo @collection, 'sync', @unsetLoading
    @listenTo @collection, 'add', @appendChannel
    @listenTo @collection, 'searched', @render
    @listenTo @state, 'change', @setLoading

  loadingOrExpired: ->
    @state.get('loading') or 
    @state.get('disabled') or 
    mediator.shared.state.get('lightbox')

  setLoading: ->
    if @state.get('loading') is true
      $('#l-infinite-loader-container').addClass 'is-loading'
    else
      $('#l-infinite-loader-container').removeClass 'is-loading'

  maybeLoad: =>
    return false if @loadingOrExpired()

    total = document.body.scrollHeight
    scrollPos = (document.documentElement.scrollTop || document.body.scrollTop)
    progress = scrollPos + window.innerHeight * 6

    @loadNextPage()  if total - progress < @threshold

  query: ->
    val = @$('.js-channel-filter').val()
    if val is '' then null else val 

  searchChannels: =>
    @state.set loading: true, disabled: false

    @params.set
      q: @query()
      page: 1

  loadNextPage: -> 
    @state.set 'loading', true
    @params.set page: @params.get('page') + 1
  
  unsetLoading: (collection, response) ->
    @state.set 'loading', false
    @state.set('disabled', true) unless response.channels.length

  appendChannel: (model) ->
    @$('.js-user-channels-contents').append channelGroupTemplate
      channel: model.toJSON()
      user: @user
    
    view = new ChannelGroupView
      channel: model.toJSON()
      el: @$(".js-channel-group[data-id=#{model.id}]")
    
    view.initBlockViews()  

  render: ->
    channels = @collection.toJSON()

    @$('.js-user-channels-contents').html template 
      channels: channels
      user: @user
    
    @setUpChannelGroupViews()

  setUpChannelGroupViews: ->
    channels = @collection.toJSON()
    
    for channel in channels
      view = new ChannelGroupView
        channel: channel
        el: @$(".js-channel-group[data-id=#{channel.id}]")
      
      view.initBlockViews()   

      @subviews.push view

    remove: ->
      invoke @subviews, 'remove'
      super