module.exports = ($el) ->
  return unless $el.length

  name = 'LoggedOutHeader'

  $foldProxy = $ """
    <div style='position: absolute; top: 0; width 0; height: 200%;'>
    </div>
  """

  $('body').append $foldProxy

  activeClassName = "#{name}--active"

  $foldProxy.waypoint
    offset: 'bottom-in-view'
    handler: (direction) ->
      switch direction
        when 'down'
          $el.addClass activeClassName
        when 'up'
          $el.removeClass activeClassName
