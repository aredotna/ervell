Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
BlockView = require './block_view.coffee'

blockTemplate = -> require('../templates/block_manage.jade') arguments...

module.exports = class ManageBlockView extends Backbone.View
  
  events: 
    'click .manage__block__export_link': 'exportChannel'

  initialize: ->
    super
    @setElement $("##{@model.id}")
  
  render: ->
    @container.append blockTemplate(block: @model, user: @current_user)

  exportChannel: (e)->
    e.preventDefault()

    format = 'json'

    $.ajax
      type: 'POST'
      url: "https://export-are-na.herokuapp.com/#{@model.get('slug')}.#{format}"
      success: (response) => @renderExportStatus(response)
      error: (response) => @renderExportStatus(response)

  renderExportStatus: (status)->
    @$('.manage__block__export').html(status.message)