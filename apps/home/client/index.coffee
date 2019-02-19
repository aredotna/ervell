{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
{ default: Player } = require '@vimeo/player';

slides = require './slides.coffee'
loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: DescriptiveCarousel } = require '../../../react/components/DescriptiveCarousel/index.js'

module.exports = ->
  loggedOutNav()

  mountWithApolloProvider DescriptiveCarousel, { slides }, $('.js-home-carousel')

  $el = $('.js-home')

  iframe = document.querySelector('iframe');
  player = new Player(iframe);

  $el.find '.js-to-fold'
    .on 'click', (e) ->
      $('.HomeHero__image > img').css({ opacity: 0 })
      $('.HomeHero__image__play').css({ opacity: 0 })
      $('.HomeHero__image__video').show()
      
      player.play()
