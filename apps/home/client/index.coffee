{ DEMO_BLOCKS } = require('sharify').data
imagesLoaded = require 'imagesloaded'
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

module.exports = ->
  $html = $('html, body')
  $el = $('.js-home')

  # Next links
  $el.find('.js-to-fold, .js-next')
    .on 'click', (e) ->
      e.preventDefault()

      $target = $(this).closest('.js-section').next('.js-section')
      $html.animate scrollTop: $target.offset().top, 'fast'

  # Toggle header
  $el.find('.js-fold')
    .waypoint
      offset: 'bottom-in-view'
      handler: (direction) ->
        if direction is 'down'
          $el.addClass 'Home--active'
        else
          $el.removeClass 'Home--active'

  # Render example blocks for hero
  $demoBlock = $el.find('.js-demo-block')

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
