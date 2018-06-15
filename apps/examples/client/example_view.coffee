Backbone = require 'backbone'

template = -> require('../templates/example.jade') arguments...

module.exports = class ExampleView extends Backbone.View

  events: 
    'click .js-load-more' : 'fetchAndRender'

  fetchAndRender: (e) ->
    e.preventDefault()
    
    id = @$el.data('id')
    
    $.get "/api/examples/#{id}", (example) =>
      @$el.html template
        example: example

