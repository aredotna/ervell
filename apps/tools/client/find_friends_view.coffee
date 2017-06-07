Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Contacts = require '../../../collections/contacts.coffee'

FollowButtonView = require '../../../components/follow_button/client/follow_button_view.coffee'

template = -> require('../templates/tabs/find_friends.jade') arguments...

module.exports = class FindFriendsView extends Backbone.View

  events:
    'click .js-toggle-auth': 'toggleConnect'

  initialize: ->
    @listenTo @model, 'sync', @render

  toggleConnect: ->
    if @model.id then @disconnect() else @connect()

  connect: (e) ->
    url = "#{sd.API_URL.replace('/v2', '')}/auth/#{@model.get('provider')}"
    window.location.href = url

  disconnect: (e) ->
    @model.destroy
      success: =>
        @model.clear()
        @render()

  render: ->
    collection = new Contacts @model.get('users')

    @$el.html template 
      tab: 'find-friends'
      auth: @model
      users: collection.models

    for user in collection.models
      new FollowButtonView
        el: @$(".js-follow[data-id=#{user.id}]")
        model: user
        showTitle: false