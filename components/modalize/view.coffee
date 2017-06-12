_ = require 'underscore'
Backbone = require 'backbone'
template = require './templates/index.coffee'
mediator = require '../../lib/mediator.coffee'

module.exports = class Modalize extends Backbone.View
  className: 'modalize'

  defaults: dimensions: width: '100%'

  events:
    'click .js-modalize-backdrop': 'maybeClose'
    'click .js-modalize-close': 'close'

  initialize: (options = {}) ->
    { @subView, @dimensions } = _.defaults options, @defaults
    $(window).on 'keyup.modalize', @escape
    mediator.on 'position:updated', @updatePosition
    mediator.on 'modal:close', @close, @

  updatePosition: (pos) =>
    @scrollPosition = pos

  state: (state, callback = $.noop) -> _.defer =>
    @$el.attr 'data-state', state
    callback()

  dialog: (state, callback = $.noop) ->
    duration = {
      slide: 500, fade: 250
    }[state.replace /-in|-out$/, '']

    @$dialog.attr 'data-state', state

  __render__: ->
    @$el.html template()
    @__rendered__ = true
    @state 'open'
    @scrollPosition = $(document).scrollTop()
    $('body').addClass 'is-scrolling-disabled'
    $('#layout-header').css 'pointer-events', 'none'

    $('.js-container').css
      width: '100%'
      position: 'fixed'
      left: 0
      top: '-'+@scrollPosition+'px'
      minHeight: '100%'
    this

  render: ->
    unless @__rendered__
      @__render__()
      @trigger 'opening'
    @postRender()
    this

  __postRender__: ->
    (@$dialog = @$('.js-modalize-dialog')).css @dimensions
    (@$body = @$('.js-modalize-body')).html @subView.render().$el
    @__postRendered__ = true
    this

  postRender: ->
    unless @__postRendered__
      @__postRender__()
      @trigger 'opened'
    else
      @subView.render().$el
    this

  escape: (e) =>
    @close(null, e) if e.which is 27

  maybeClose: (e) ->
    @close(null, e) if $(e.target).hasClass('js-modalize-backdrop')

  close: (callback, e) ->
    $(window).off 'keyup.modalize'
    @trigger 'closing'
    @state 'close', =>
      $('body').removeClass 'is-scrolling-disabled'
      _.delay (=> $('#layout-header').css 'pointerEvents', 'auto'), 500
      $('.js-container').removeAttr 'style'
      $(document).scrollTop(@scrollPosition)
      @subView?.remove?()
      @remove()
      callback?()
      @trigger 'closed', e
