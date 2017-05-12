{ throttle } = require 'underscore'
Backbone = require 'backbone'

module.exports = class ConnectSearchView extends Backbone.View
  tagName: 'input'

  amount: 3

  className: 'Connect__search Input'

  attributes:
    placeholder: 'Type Channel Name'
    autofocus: true

  events:
    input: ->
      @search arguments...

  initialize: ->
    @search = throttle @perform, 250

  perform: (e) ->
    e.preventDefault()

    query = $(e.currentTarget).val().trim()

    return if query is @query

    @query = query

    return @trigger 'reset' if @query.length < 2

    @trigger 'query', @query

    @request?.abort()
    @request = @collection.fetch
      data:
        q: @query
        per: @amount
        show_open: true
        filter: type: 'channel'

  render: ->
    this
