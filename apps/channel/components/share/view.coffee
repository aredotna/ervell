Backbone = require 'backbone'
copy = require 'copy-to-clipboard'
{ extend, map } = require 'underscore'
{ APP_URL, CURRENT_PATH } = require('sharify').data
analytics = require '../../../../lib/analytics.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ChannelShareView extends Backbone.View
  className: 'ChannelShare'

  events:
    'click .js-toggle': 'toggle'
    'click .js-copy-url': 'copyURL'
    'click .js-share-external': 'shareExternal'
    'click .js-reload': 'reload'
    'click .js-disable-public-link': 'disablePublicLink'
    'click .js-select-all': 'selectAll'

  initialize: ({ channel, text }) ->
    @channel = channel
    @state = new Backbone.Model
      status: 'inactive'
      url: APP_URL + CURRENT_PATH
      text: encodeURIComponent(text)

    @listenTo @state, 'change', @render

  toggle: (e) ->
    e.preventDefault()

    if @channel.get('status') is 'private' and not @channel.has('share_link')
      @state.set 'status', 'generating'

      @channel
        .generateShareLink()
        .then () =>
          @state.set
            status: 'active'
            url: @channel.shareHref()

        .catch () =>
          @state.set 'status', 'error'

    else if @channel.get('status') is 'private'
      @state.set
        status: 'active'
        url: @channel.shareHref()

    else
      @state.set 'status', 'active'

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
    $window = $(window)

    x = window?.screenLeft or window.screenX
    y = window?.screenTop or window.screenY

    properties =
      status: 1
      width: w = 750
      height: h = 400
      top: (y + ($window.height() / 2) - (h / 2)) or 0
      left: (x + ($window.width() / 2) - (w / 2)) or 0

    options = map(properties, (v, k) -> "#{k}=#{v}").join ','

    service = $target.data('service')

    window.open $target.attr('href'), service, options

    analytics.track.click 'Clicked a social share', service: service

  disablePublicLink: (e) ->
    e.preventDefault()

    $label = ($target = $(e.currentTarget)).text()

    $target.text 'Disabling...'

    @channel.removeShareLink()
      .then () =>
        @state.set 'status', 'inactive'

      .catch () =>
        $target.text 'Error disabling link'

        setTimeout (-> $target.text label), 2000

  selectAll: (e) ->
    $(e.currentTarget).select()

  reload: (e) ->
    e.preventDefault()

    window.location.reload(true)

  render: ->
    @$el.html template extend {},
      @state.toJSON(),
      channel: @channel.toJSON()

    this
