Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class InviteCollaboratorView extends Backbone.View
  className: 'InviteCollaborator'
  events:
    'click': 'invite'

  initialize: ({ @email }) -> #

  invite: ->
    @collection._invite @email

  render: ->
    @$el.html template
      email: @email

    this
