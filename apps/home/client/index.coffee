{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: HomeCarousel } = require '../../../react/components/HomeCarousel/index.js'

module.exports = ->
  loggedOutNav()

  mountWithApolloProvider HomeCarousel, {}, $('.js-home-carousel')

  $html = $('html, body')
  $el = $('.js-home')
  $sections = $el.find('.js-section')

  $el.find '.js-to-fold'
    .on 'click', (e) ->
      e.preventDefault()

      $target = $(this)
        .closest '.js-section'
        .next '.js-section'

      yPos = $target.position().top

      $html.animate scrollTop: yPos, 'fast'
