Backbone = require 'backbone'

module.exports = class HeaderInfoView extends Backbone.View
  el: $('header.header--info')

  events:
    'tap .header--info__mobile-menu__trigger' : 'toggleMenu'

  toggleMenu: (e) ->
    e.preventDefault()
    @$('.header--info__mobile-menu').toggleClass 'is-open'
