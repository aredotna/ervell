_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
AuthModalView = require '../auth_modal/view.coffee'
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

  login: ->
    @openAuthModal
      mode: 'login'
      redirectTo: sd.CURRENT_PATH

  signup: ->
    @openAuthModal
      mode: 'signup'
      redirectTo: sd.CURRENT_PATH

  openAuthModal: (options) ->
    mediator.trigger 'open:auth', options
    @modal = new AuthModalView options

  hideBlock: ->
    @modal?.close => @removeRoute()

  showBlock: (id, tab)->
    return if (sd.CURRENT_PATH.indexOf('block') > 0)
    block = new Block {id: id}
    view = new FullBlockView model: block, tab: tab

    @modal = modalize view,
      className: 'modalize things-modal'

    @modal.load (done) ->
      block.fetch().then done

    @modal.view.on 'closed', =>
      @removeRoute()

  removeRoute: ->
    loc = window.location
    history.pushState "", document.title, sd.CURRENT_PATH
    @navigate sd.CURRENT_PATH, trigger: false, replace: true

