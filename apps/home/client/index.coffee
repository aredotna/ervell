{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

{ default: mount } = require '../../../react/apollo/index.js'
{ default: HomeCarousel } = require '../../../react/components/HomeCarousel/index.js'

module.exports = ->
  loggedOutNav()

  mount HomeCarousel, {}, $('.js-home-carousel')
