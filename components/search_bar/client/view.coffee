Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data

module.exports = class SearchBarView extends Backbone.View

  events:
    ''

  initialize: (options)->
    @$input = options.$input
    console.log 'initialize', @$input