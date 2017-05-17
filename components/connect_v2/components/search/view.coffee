{ throttle } = require 'underscore'
Backbone = require 'backbone'
config = require '../../config.coffee'

module.exports = class ConnectSearchView extends Backbone.View
  tagName: 'input'

  className: 'Connect__search Input'

  attributes:
    placeholder: 'Type Channel Name'
    autofocus: true

  events:
    input: ->
      @search arguments...

  initialize: ({ @state }) ->
    @__collection__ = @collection.toJSON()

    @search = throttle @perform, 250

  restore: ->
    @collection.reset @__collection__

  perform: (e) ->
    e.preventDefault()

    query = $(e.currentTarget).val().trim()

    return if query is @state.get 'query'

    @state.set query: query

    if query.length < 1
      @restore() if @collection.length is 0
      @state.set active: false

      return

    else
      @state.set active: true

    @request?.abort()

    @request = @collection
      .fetch
        data:
          q: query
          per: config.amount
          show_open: true
          filter: type: 'channel'

  render: ->
    this
