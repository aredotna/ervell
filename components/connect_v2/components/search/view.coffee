{ throttle } = require 'underscore'
Backbone = require 'backbone'
config = require '../../config.coffee'

module.exports = class ConnectSearchView extends Backbone.View
  tagName: 'input'

  className: 'Connect__search Input'

  attributes:
    placeholder: 'Type channel name'
    autofocus: true

  events:
    input: ->
      @query arguments...

  initialize: ({ @state, @search }) ->
    @query = throttle @perform, 200

  restore: ->
    @search.reset @collection.toJSON()

  perform: (e) ->
    e.preventDefault()

    query = $(e.currentTarget).val().trim()

    return if query is @state.get 'query'

    @state.set query: query

    if query.length < 1
      @restore()
      @state.set 'active', false
      return
    else
      @state.set 'active', true

    @request?.abort()
    @request = @search.fetch
      data:
        q: query
        per: config.amount
        show_open: true
        filter: type: 'channel'

  render: ->
    @$el.val @state.get('query')
    this
