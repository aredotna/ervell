_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
AuthView = require '../auth/view.coffee'
ImageView = require '../image/view.coffee'
Block = require '../../models/block.coffee'
modalize = require '../modalize/index.coffee'
FullBlockView = require '../../apps/block/client/view.coffee'

module.exports = class Router extends Backbone.Router
  routes:
    '' : 'hideBlock'
    'block/:id': 'showBlock'
    'block/:id/:tab': 'showBlock'
    'log_in': 'login'
    'sign_up': 'signup'
    ':user_id/:channel_id' : 'hideBlock'
    ':user_id' : 'hideBlock'

  initialize: ->
    mediator.on 'slide:to:block', @updateRoute, @
    @onChangeCaptureUrlParams()


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
    view = new AuthView options

    @modal = modalize view,
      className: 'modalize things-modal'

    @modal.open()

    @modal.view.on 'closed', =>
      @removeRoute()

  hideBlock: ->
    return location.reload() if sd.BLOCK
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
    @navigate sd.CURRENT_PATH + @urlSearchParams, trigger: false, replace: true

  onChangeCaptureUrlParams: ->
    @urlSearchParams = ''

    @on 'route', ->
      { search } = window.location
      @urlSearchParams = search if !_.isEmpty(search)
