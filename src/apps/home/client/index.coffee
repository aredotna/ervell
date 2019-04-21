{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
{ default: Player } = require '@vimeo/player';

slides = require './slides.coffee'
loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

{ mountWithApolloProvider } = require '../../../v2/apollo/index.js'
{ default: DescriptiveCarousel } = require '../../../v2/components/DescriptiveCarousel/index.js'

module.exports = ->
  loggedOutNav()

  mountWithApolloProvider DescriptiveCarousel, { slides }, $('.js-home-carousel')

  $el = $('.js-home')

  video = $('.js-desktop-video iframe');
  player = new Player(video);

  $el.find '.js-to-fold'
    .on 'click', (e) ->
      $('.HomeHero__image > img').css({ opacity: 0 })
      $('.js-desktop-video-play').css({ opacity: 0 })
      $('.js-desktop-video').show()

      player.play()
