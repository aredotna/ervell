module.exports = ->
  $el = $('.js-logged-out-menu')
  $links = $el.find('a')
  $sections = $('.js-section[id]')

  activate = (id) ->
    $links
      .attr('data-state', 'inactive')
      .filter("[href='about##{id}']")
      .attr('data-state', 'active')

  handler = (direction) ->
    activate this.element.id

  handle = (desired) -> (direction) ->
    return unless direction is desired
    handler.bind(this)(direction)

  $sections.waypoint
    offset: -1
    handler: handle 'up'

  $sections.waypoint
    offset: 'bottom-in-view'
    handler: handle 'down'

  $links.on 'click', (e) ->
    id = $(this).attr('href').split('#').pop()
    # Ensures the click handler always wins
    setTimeout (-> activate id), 1
