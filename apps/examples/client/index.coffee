ExampleView = require './example_view.coffee'

examplesTemplate = -> require('../templates/examples.jade') arguments...

module.exports = ->

  initializeViews = ->
    $('.js-example').each ($el) ->
      new ExampleView
        el: this

  initializeViews()

  $('.js-load-more-examples').on 'click', (e) ->
    e.preventDefault()

    currentPage = parseInt($(this).attr('data-current-page')) + 1
    totalPages = $(this).attr('data-total-pages')

    $.get "/api/examples?page=#{currentPage}", (examples) ->
      html = examplesTemplate examples: examples
      $('.Page--examples-list').append html

      initializeViews()

      if currentPage >= totalPages
        $('.js-load-more-examples').css display: 'none'
      else
        $('.js-load-more-examples').attr('data-current-page', currentPage)



