Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
FollowButtonView = require '../../../components/follow_button/client/follow_button_view.coffee'
Block = require '../../../models/block.coffee'

template = -> require('../templates/tabs/find_friends.jade') arguments...

module.exports = class FindFriendsView extends Backbone.View

  events:
    'click .static__tools__social-button': 'toggleConnect'

  initialize: ({ @$container })->
    @listenTo @model, 'sync', @render

  render: ->
    @$el.html template tab: 'find-friends', auth: @model
    for user in @model.get('users')
      new FollowButtonView
        el: @$("#follow_button--#{user.id}")
        model: new Block user
        showTitle: false

  toggleConnect: ->
    if @model.id
      @disconnect()
    else
      @connect()

  connect: (e) ->
    window.location.href = "#{sd.API_URL.replace('/v2', '')}/auth/#{@model.get('provider')}"

  disconnect: (e) ->
    @model.destroy
      success: =>
        @model.clear()
        @render()