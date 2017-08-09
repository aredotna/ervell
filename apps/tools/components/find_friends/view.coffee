{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Authentication = require '../../../../models/authentication.coffee'
FoundFriendsView = require '../../../../components/found_friends/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ToolsFindFriendsView extends Backbone.View
  className: 'ToolsFindFriends'

  subViews: []

  events:
    'click .js-connect-twitter': 'connectTwitter'
    'click .js-disconnect-twitter': 'disconnectTwitter'

  initialize: ->
    @authentication = new Authentication provider: 'twitter'

    @listenTo @authentication, 'sync', @render

    @authentication.fetch()

  connectTwitter: (e) ->
    e.preventDefault()

    window.location.href =
      "#{API_URL.replace '/v2', ''}/auth/twitter"

  disconnectTwitter: (e) ->
    e.preventDefault()

    @authentication.destroy
      success: =>
        @authentication.clear()
        @render()

  postRender: ->
    @subViews = [
      view = new FoundFriendsView model: @authentication
    ]

    @$('.js-found-friends').html view.render().$el

  render: ->
    @$el.html template
      authentication: @authentication

    @postRender()

    this

  remove: ->
    invoke @subViews, 'remove'
    super
