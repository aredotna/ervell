{ DEMO_BLOCKS } = require('sharify').data
blockTemplate = ->
  require('../../../components/block_v2/templates/block.jade') arguments...

module.exports = ->
  $html = $('html, body')
  $el = $('.js-home')

  $el.find('.js-to-fold')
    .on 'click', (e) ->
      e.preventDefault()

      $target = $(this).closest('.js-section').next('.js-section')
      $html.animate scrollTop: $target.offset().top, 'fast'

  $el.find('.js-fold')
    .waypoint
      offset: 'bottom-in-view'
      handler: (direction) ->
        if direction is 'down'
          $el.addClass 'Home--active'
        else
          $el.removeClass 'Home--active'


  changeBlock = ->
    block = DEMO_BLOCKS.shift()
    $el.find('.js-demo-block')
      .html blockTemplate block: block
    DEMO_BLOCKS.push block

  setInterval changeBlock, 100
