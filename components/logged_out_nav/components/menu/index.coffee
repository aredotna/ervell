{ isTouch } = require '../../../../components/util/device.coffee'

NAME = 'LoggedOutMenu'

module.exports = ({ $el, $sections }) ->
  $html = $('html, body')
  $toggle = $el.find('.js-toggle')
  $options = $el.find('.js-options')
  $links = $options.find('a')

  $toggle.on 'click', (e) ->
    e.preventDefault()

    $el.toggleClass "#{NAME}--active"

  $links.on 'click', (e) ->
    e.preventDefault()

    STATE.navigating = true

    id = $(this).attr('href').split('#').pop()

    activate id

    return unless $sections?.length

    $target = $sections.filter("[id='#{id}']")

    offset = if ($page = $('.js-page')).length
      parseInt($page.css('margin-top'), 10) +
      parseInt($page.css('padding-top'), 10)
    else
      0

    yPos = if id is 'top'
      0
    else
      $target.offset().top - offset

    $html
      .animate(scrollTop: yPos, 'fast')
      .promise()
      .then ->
        STATE.navigating = false

    if isTouch()
      $el.removeClass "#{NAME}--active"

  # Deal with highlighting current section
  # if we have sections to reference
  return unless $sections?.length

  STATE =
    navigating: false

  activate = (id) ->
    $links
      .attr('data-state', 'inactive')
      .filter("[href='/about##{id}']")
      .attr('data-state', 'active')

  handler = (direction) ->
    activate this.element.id

  handle = (desired) -> (direction) ->
    return if STATE.navigating
    return unless direction is desired
    handler.bind(this)(direction)

  $sections.waypoint
    offset: -1
    handler: handle 'up'

  $sections.waypoint
    offset: 'bottom-in-view'
    handler: handle 'down'
