module.exports = ($el) ->
  NAMESPACE = 'searchableInput'

  bind: ->
    $el
      .on "focus change keyup paste.#{NAMESPACE}", 'input', ({ currentTarget: { value }}) ->
        $el.attr 'data-state', if value is '' then 'focus' else 'input'

      .on "blur.#{NAMESPACE}", 'input', ->
        $el.attr 'data-state', 'blur'

      .on "click.#{NAMESPACE}", 'input', (e) ->
        e.stopPropagation()

      .on "click.#{NAMESPACE}", ->
        $el.find('input').val('').focus()

  unbind: ->
    $el.off ".#{NAMESPACE}"
