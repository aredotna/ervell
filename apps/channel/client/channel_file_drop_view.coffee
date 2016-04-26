Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

channelFileDropTemplate = -> require('../templates/filedrop.jade') arguments...

module.exports = class ChannelFileDropView extends Backbone.View
  events:
    'dragenter' : 'handleDrag'
    'dragend' : 'clearDrag'
    'dragleave .channel--drop-zone' : 'clearDrag'

  initialize: (options)->
    @channel = options.channel
    @blocks = options.blocks
    @policy = options.policy

    @renderFileDrop()
    @setupFileDrop()

  handleDrag: (e)->
    return false if mediator.shared.state.get('isDraggingBlocks')
    @$('.channel--drop-zone').addClass('is-droppable')

  clearDrag: (e) ->
    @$('.channel--drop-zone').removeClass('is-droppable')
    @$('.channel--drop-zone__progress').css('width', '0%')

  uniqueId: (length=8) ->
    id = ""
    id += Math.random().toString(36).substr(2) while id.length < length
    id.substr 0, length

  renderFileDrop: ->
    @$('.channel__filedrop').html channelFileDropTemplate(policy: @policy, channel: @channel)

  setupFileDrop: ->
    view = @

    @$("#fileupload").fileupload
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png|ai|eps|kml|kmz|mb|ma|tex|texi|texinfo|tfm|fla|webm|ind|indd|key|pages|pdf|epub|psd|torrent|mp3|wav|aac|oga|ogg|wma|midi|aiff|mpeg|mpg|mpg4|mp4|mp4v|swa|swf|ttc|ttf|otf|pgp|numbers|fxp|latex|mov|avi|h264|ogv|docx|doc|ppt|pptx|xls|xlsx|xlt|tif|tiff|webloc)$/i
      maxFileSize: 104857600 # 100MB
      dropZone: @$el
      autoUpload: true
      limitMultiFileUploads: 300
      dataType: "XML"
      fileInput: @$("input:file")
      url: @policy.bucket

      drop: (e, data) =>
        analytics.track.click "Files dropped on #{@channel.get('status')} channel"
        @$('.channel--drop-zone').addClass('is-droppable is-uploading')
        mediator.trigger "files:dropped",
          count: data.files.length

      formData: (form) ->
        data     = form.serializeArray()
        fileType = ""
        fileType = @files[0].type if "type" of @files[0]

        data.push
          name: "Content-Type"
          value: fileType

        data[0].value = data[0].value.replace ":uuid", view.uniqueId()

        return data

      fail: (e, data) =>
        mediator.trigger "files:fail"

      start: (e, data) =>
        @$('.channel--drop-zone').addClass('is-droppable is-uploading')
        mediator.trigger "files:start"

      done: (e, data) =>
        # Parse XML response and get image URL
        xmlDoc   = $.parseXML(data.jqXHR.responseText)
        location = $(xmlDoc).find("Location").text()

        mediator.trigger "upload:done", location

        @clearDrag()

      stop: =>
        mediator.trigger "upload:complete"

      progressall: (e, data) =>
        progress = parseInt(data.loaded / data.total * 100, 10)
        @$('.channel--drop-zone__progress').css('width', "#{progress}%")
        mediator.trigger 'file:upload', progress
