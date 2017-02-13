Backbone = require 'backbone'
sd = require('sharify').data
Q = require 'q'
{ map } = require 'underscore'
qlimit = require 'qlimit'
Block = require '../../../../models/block.coffee'
Blocks = require '../../../../collections/blocks.coffee'
Channel = require '../../../../models/channel.coffee'
SearchBlocks = require '../../../../collections/search_blocks.coffee'
ImportSelectChannelView = require './import_select_channel_view.coffee'

template =-> require('./templates/import_status.jade') arguments...
limit = qlimit(1)

class Status extends Backbone.Model

module.exports = class ImportStatusView extends Backbone.View
  events:
    'click .import__status__inner__connect' : 'connectLinks'

  initialize: ->    
    @selectedChannel = new Channel()
    @selectedChannel.url = "#{sd.API_URL}/channels/"
    @status = new Status 
      selecting: false
      connecting: false
    @search = new SearchBlocks()
    @search.url = "#{sd.API_URL}/user/#{sd.CURRENT_USER.slug}/search"
    @blocks = new Blocks()

    @listenTo @collection, 'model:selected', @render
    @listenTo @status, 'change', @render

  connectLinks: ->
    @status.set connecting: true
    blocks = @collection.filter('selected')
    @maybeCreateChannel()
      .then @createBlocks
      .then @showSuccess
      .catch @showError

  maybeCreateChannel: ->
    dfd = Q.defer()
    if @selectedChannel.get('is_new')
      @selectedChannel.save null, success: => dfd.resolve()
    else
      dfd.resolve()
    dfd.promise

  createBlocks: =>
    Q.all map @collection.filter('selected'), limit @createBlockFromLink
    .catch @showError

  createBlockFromLink: (link) =>
    dfd = Q.defer()
    blocks = @blocks
    selectedChannel = @selectedChannel
    block = new Block source: link.get('href')
    existingConnections = link.get('connections') or []
    @createOrConnectBlock.then (block) ->
        connections = existingConnections.concat [
          {
            title: selectedChannel.get('title')
            status: selectedChannel.get('status')
            slug: selectedChannel.get('slug')
            user_slug: selectedChannel.get('user').slug
          }
        ]
        link.set
          block_id: block.id
          selected: false
          connections: connections
        link.collection.trigger 'model:selected'
        dfd.resolve()
    dfd.promise

  createOrConnectBlock: (link, selectedChannel)->
    dfd = Q.defer()
    if link.has('connections')
      $.ajax
        type: "POST"
        url: "#{sd.API_URL}/channels/#{id}/connections"
        data:
          connectable_type: 'Block'
          connectable_id: link.get('block_id')
          channel_id: selectedChannel.id
        success: dfd.resolve
        error: dfd.error
    else
      blocks.create block.toJSON(),
        url: "#{sd.API_URL}/channels/#{selectedChannel.get('slug')}/blocks"
        success: dfd.resolve
        error: dfd.reject
    dfd.promise
      
  showSuccess: =>
    @status.set
      selecting: false
      connecting: false
    @selectedChannel.reset()

  showError: (e) ->
    console.log('error', e, e.stack)

  render: ->
    @$el.html template
      collection: @collection
      status: @status
      selectedChannel: @selectedChannel

    @_postRender()
  
  _postRender: ->
    new ImportSelectChannelView
      el: @$('.import__status__inner__select')
      model: @selectedChannel
      status: @status
      search: @search
    .render()

