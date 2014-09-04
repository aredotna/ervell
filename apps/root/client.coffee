# // TODO: make into a block view

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Feed = require "../../collections/feed"

module.exports.init = ->
  if sd.USERNAME
    new FeedView
      el: $ ".feed-container"
      collection: new Feed type: 'primary', user: sd.CURRENT_USER
