{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

module.exports = ->
  loggedOutNav()

  $html = $('html, body')
  $el = $('.js-home')
  $sections = $el.find('.js-section')

  # Next links
  $el.find '.js-to-fold, .js-next'
    .on 'click', (e) ->
      e.preventDefault()

      $target = $(this)
        .closest '.js-section'
        .next '.js-section'

      # If we're at the last section, just scroll to the actual bottom
      yPos = if $sections.index($target) is $sections.length - 1
        $html.height()
      else
        $target.offset().top

      $html.animate scrollTop: yPos, 'fast'

  # Render example blocks for hero
  $demoBlock = $el.find '.js-demo-block'

  changeBlock = ->
    block = DEMO_BLOCKS.shift()
    $next = $ blockTemplate block: block
    imagesLoaded $next, ->
      $demoBlock.html $next
    DEMO_BLOCKS.push block

  setInterval changeBlock, 500

  # Intercept block clicks and open in new tab
  $demoBlock.on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()

    href = $(this)
      .children 'a'
      .attr 'href'

    $('<a>')
      .attr 'href', href
      .attr('target', '_blank')[0]
      .click()

  # Trigger faded hover state on demo block
  $el.find '.js-connect'
    .on 'mouseenter', ->
      $demoBlock.addClass 'HomeHero__demo-block--hover'
    .on 'mouseout', ->
      $demoBlock.removeClass 'HomeHero__demo-block--hover'
