{ invoke } = require 'underscore'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
{ API_URL } = require('sharify').data
Authentication = require '../../../../models/authentication.coffee'
FoundFriendsView = require '../../../../components/found_friends/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingFindFriendsSceneView extends Backbone.View
  className: 'OnboardingFindFriends'

  subViews: []

  events:
    'click .js-connect-twitter': 'connectTwitter'
    'click .js-next': 'next'

  initialize: ({ @state }) ->
    @authentication = new Authentication provider: 'twitter'

    @listenTo @authentication, 'sync', @render

    @authentication.fetch()

  next: (e) ->
    e.preventDefault()
    @state.next()

  connectTwitter: (e) ->
    e.preventDefault()

    window.location.href =
      "#{API_URL.replace '/v2', ''}/auth/twitter"

  postRender: ->
    @subViews = [
      view = new FoundFriendsView model: @authentication
    ]

    @$('.js-found-friends').html view.render().$el

    if @authentication.id?
      # Hide "Find Friends" tip on profile
      Cookies.set 'find_friends_message', true

  render: ->
    @$el.html template
      state: @state
      authentication: @authentication

    @postRender()

    this

  remove: ->
    invoke @subViews, 'remove'
    super
