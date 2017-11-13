moment = require 'moment'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
CurrentUser = require '../../models/current_user.coffee'
MessageView = require '../message/view.coffee'

messages = [
  {
    id: 'bookmarklet_message'
    title: 'Bookmarklet'
    body: 'Save to Are.na faster with <a href="/tools/bookmarklet">the bookmarklet</a>'
  }
  {
    id: 'find_friends_message'
    title: 'Find friends'
    body: '<a href="/tools/find-friends">Find friends from Twitter</a> on Are.na'
  }
]

module.exports = ->
  # Only displays message when user hasn't cleared all of the tips
  return unless CURRENT_USER

  return unless moment().isAfter(moment(CURRENT_USER.created_at).add(2, 'minutes'))

  for message in messages
    model = new Backbone.Model message

    messageView = new MessageView model: model

    if messageView.isRenderable()
      $('body').append messageView.render().$el