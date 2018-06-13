Backbone = require 'backbone'

template = -> require('../templates/example.jade') arguments...

module.exports = class ExampleView extends Backbone.View

  events: 
    'click .js-load-more' : 'fetchAndRender'

  initialize: ->
    console.log('initializing', @)

  fetchAndRender: (e) ->
    e.preventDefault()
    
    id = @$el.data('id')

    console.log('id', id)
    
    $.get "/api/examples/#{id}", (example) =>
      @$el.html template
        example: example

