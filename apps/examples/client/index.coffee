ExampleView = require './example_view.coffee'

module.exports = ->
  $('.js-example').each ($el) ->
    new ExampleView
      el: this
