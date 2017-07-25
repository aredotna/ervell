module.exports = ->
  $html = $('html, body')
  $el = $('.js-logged-out-menu')
  $links = $el.find('a')
  $sections = $('.js-section[id]')

  STATE =
    navigating: false

  activate = (id) ->
    $links
      .attr('data-state', 'inactive')
      .filter("[href='about##{id}']")
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

  $links.on 'click', (e) ->
    e.preventDefault()

    STATE.navigating = true

    id = $(this).attr('href').split('#').pop()

    activate id

    $target = $sections.filter("[id='#{id}']")

    yPos = $target.offset().top

    $html
      .animate(scrollTop: yPos, 'fast')
      .promise()
      .then ->
        STATE.navigating = false
