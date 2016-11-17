Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
template = -> require('./template.jade') arguments...

module.exports = class ImageView extends Backbone.View
  events: 
    'click .image-view' : 'close'

  initialize: ({ @src }) ->
    # no op

  close: ->
    mediator.trigger 'modal:close'

  render: ->
    @$el.html template src: @src

    this

