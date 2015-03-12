_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

module.exports = class ChannelExportView extends Backbone.View

  events:
    'click .export--option' : 'exportChannel'

  exportChannel: (e) ->
    format = $(e.currentTarget).data 'format'

    console.log 'format', format

    $.ajax
      type: 'POST'
      url: "https://export-are-na.herokuapp.com/#{@model.get('slug')}.#{format}"
      success: (response) => @renderExportStatus(response)
      error: (response) => @renderExportStatus(response)

  renderExportStatus: (status)->
    @$('.export__status').html(status.message)
    _.delay (=> @$('.export__status').html "" ), 10000