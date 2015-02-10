_ = require 'underscore'
Backbone = require 'backbone'
ModalView = require '../../modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'

template =-> require('../templates/channel_settings.jade') arguments...

module.exports = class ChannelSettingsModalView extends ModalView
  className: 'channel-settings'

  template: template

  events: -> _.extend super,
    'click .auth-toggle': 'showError'

  updatePosition: =>
    _.delay =>
      console.log '@$el.height()', @$el.height(), '@$dialog.height()', @$dialog.height()
      console.log '@$el', @$el
      @$dialog.css
        top: ((@$el.height() - @$dialog.height()) / 2) + 'px'
        left: ((@$el.width() - @$dialog.width()) / 2) + 'px'
