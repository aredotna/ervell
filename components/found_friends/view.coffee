{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Contacts = require '../../collections/contacts.coffee'
FollowButtonView = require '../follow_button/client/follow_button_view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class FindFriendsView extends Backbone.View
  className: 'FoundFriends'

  subViews: []

  initialize: ->
    @listenTo @model, 'sync', @render
    @listenTo @model, 'error', @error

  postRender: ->
    invoke @subViews, 'remove'

    @subViews = @model.related().contacts
      .map (user) =>
        followButtonView = new FollowButtonView model: user, showTitle: false
        @$(".js-follow[data-id=#{user.id}]").html followButtonView.render().$el
        followButtonView

  error: (_authentication, { responseJSON: { description } }) ->
    @$el.html """
      Try again later: #{description}
    """

  render: ->
    @$el.html template
      authentication: @model
      contacts: @model.related().contacts

    @postRender()

    this

  remove: ->
    invoke @subViews, 'remove'
    super
