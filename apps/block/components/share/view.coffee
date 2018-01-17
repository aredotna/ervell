Backbone = require 'backbone'
copy = require 'copy-to-clipboard'
{ extend } = require 'underscore'
{ APP_URL, CURRENT_PATH } = require('sharify').data
analytics = require '../../../../lib/analytics.coffee'
popOpen = require '../../../../lib/pop_open.coffee'
template = -> require('./index.jade') arguments...

module.exports = class BlockShareView extends Backbone.View
  className: 'BlockShare'

  events:
    'click .js-toggle': 'toggle'
    'click .js-copy-url': 'copyURL'
    'click .js-share-external': 'shareExternal'
    'click .js-select-all': 'selectAll'

  initialize: ({ text }) ->
    @state = new Backbone.Model
      status: 'inactive'
      url: window.location.href
      text: encodeURIComponent(text)

    @listenTo @state, 'change', @render

  toggle: (e) ->
    e.preventDefault()

    @state.set 'status', 'active'
    @$el.attr 'data-state', 'active'

    analytics.track.click 'Clicked "Share"'

  copyURL: (e) ->
    e.preventDefault()

    label = ($target = $(e.currentTarget)).text()

    copy @state.get('url')

    $target.text 'Copied!'

    setTimeout (-> $target.text label), 2000

    analytics.track.click 'Clicked "Copy link" from "Share"'

  shareExternal: (e) ->
    e.preventDefault()

    $target = $(e.currentTarget)
    href = $target.attr('href')
    service = $target.data('service')

    popOpen
      href: href
      title: service

    analytics.track.click 'Clicked a social share',
      label: 'service'
      value: service

  render: ->
    @$el.html template extend {},
      @state.toJSON()

    this
