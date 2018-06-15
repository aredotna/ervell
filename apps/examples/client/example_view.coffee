Backbone = require 'backbone'
ExampleChannelView = require './example_channel_view.coffee'
 
template = -> require('../templates/example.jade') arguments...

module.exports = class ExampleView extends Backbone.View

  events: 
    'click .js-load-more' : 'fetchAndRender'

  initialize: ->
    @initializeSubViews()

  initializeSubViews: ->
    @$('.ChannelBlockGroup').each ->
      new ExampleChannelView
        el: $(this)

  fetchAndRender: (e) ->
    e.preventDefault()
    
    id = @$el.data('id')
    
    $.get "/api/examples/#{id}", (example) =>
      @$el.html template
        example: example
