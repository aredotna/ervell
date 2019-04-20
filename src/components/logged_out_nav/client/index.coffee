header = require './header.coffee'
menu = require '../components/menu/index.coffee'

module.exports = ({ $sections } = {}) ->
  $el = $('.js-logged-out-header')

  header $el

  menu
    $el: $el.find('.js-logged-out-menu')
    $sections: $sections
