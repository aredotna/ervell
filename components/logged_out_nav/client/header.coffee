module.exports = ($el) ->
  return unless $el.length

  name = 'LoggedOutHeader'

  $foldProxy = $ """
    <div style='position: absolute; top: 0; width 0; height: 105%;'>
    </div>
  """

  $('body').append $foldProxy

  activeClassName = "#{name}--active"

  # Automatically activate if the fold won't trigger via scroll
  if $foldProxy.height() > $(document).height()
    $el.addClass activeClassName
    return

  $foldProxy.waypoint
    offset: 'bottom-in-view'
    handler: (direction) ->
      switch direction
        when 'down'
          $el.addClass activeClassName
        when 'up'
          $el.removeClass activeClassName
