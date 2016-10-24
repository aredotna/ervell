Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class ImageView extends Backbone.View

  initialize: ({ @src }) ->
    # no op

  render: ->
    @$el.html template src: @src

    this

