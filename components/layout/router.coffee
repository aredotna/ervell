_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
AuthView = require '../auth/view.coffee'
Block = require '../../models/block.coffee'
modalize = require '../modalize/index.coffee'
{ FullBlockView } = require '../../apps/block/client/index.coffee'

module.exports = class Router extends Backbone.Router
  routes:
    '' : 'hideBlock'
    'block/:id': 'showBlock'
    'block/:id/:tab': 'showBlock'
    'log_in': 'login'
    'sign_up': 'signup'

  initialize: ->
    # mediator.on 'slide:to:block', @updateRoute, @

  login: ->
    return if sd.CURRENT_PATH is '/log_in'
    @openAuthModal
      mode: 'login'
      redirectTo: sd.CURRENT_PATH

  signup: ->
    return if sd.CURRENT_PATH is '/sign_up'
    @openAuthModal
      mode: 'signup'
      redirectTo: sd.CURRENT_PATH

  openAuthModal: (options) ->
    mediator.trigger 'open:auth', options
    view = new AuthView options

    @modal = modalize view,
      className: 'modalize things-modal'

    @modal.open()

    @modal.view.on 'closed', =>
      @removeRoute()

  hideBlock: ->
    @modal?.close => @removeRoute()

  showBlock: (id, tab)->
    return if (sd.CURRENT_PATH.indexOf('block') > 0) && (sd.CURRENT_PATH.indexOf('blocks') < 0)
    block = new Block {id: id}
    view = new FullBlockView model: block, tab: tab

    @modal = modalize view,
      className: 'modalize things-modal'

    @modal.load (done) ->
      mediator.shared.state.set lightbox: true
      block.fetch().then done

    @modal.view.on 'closed', =>
      mediator.shared.state.set lightbox: false
      @removeRoute()

  updateRoute: (id)->
    @navigate "/block/#{id}", trigger: false, replace: true

  removeRoute: ->
    loc = window.location
    history.pushState "", document.title, sd.CURRENT_PATH
    @navigate sd.CURRENT_PATH, trigger: false, replace: true

