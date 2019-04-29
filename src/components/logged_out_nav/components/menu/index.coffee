{ isTouch } = require '../../../../components/util/device.coffee'

NAME = 'LoggedOutMenu'

module.exports = ({ $el, $sections }) ->
  $toggle = $el.find('.js-toggle')

  $toggle.on 'click', (e) ->
    e.preventDefault()

    $el.toggleClass "#{NAME}--active"
