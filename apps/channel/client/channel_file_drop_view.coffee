Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
MessageView = require '../../../components/message/client/message_view.coffee'

channelFileDropTemplate = -> require('../templates/_filedrop.jade') arguments...

module.exports = class ChannelFileDropView extends Backbone.View
  maxFileSize: 50000000 # 50MB
  dropLimit: 15
  currentCount: 0

  events:
    'dragenter' : 'handleDrag'
    'dragend' : 'clearDrag'
    'dragleave .channel--drop-zone' : 'clearDrag'

  initialize: ({ @channel, @blocks, @policy })->
    if mediator.shared.current_user.isPremium() 
      @dropLimit = 100 
      
    @renderFileDrop()
    @setupFileDrop()

  handleDrag: (e)->
    return false if mediator.shared.state.get('isDraggingBlocks')
    @$('.channel--drop-zone').addClass('is-droppable')

  clearDrag: (e) ->
    @$('.channel--drop-zone').removeClass('is-droppable')
    @$('.channel--drop-zone__progress').css('width', '0%')
    false

  dropLimitMessage: ->
    model = new Backbone.Model
      id: 'bookmarklet_updates_message'
      title: "File limit"
      body: "Sorry, you cannot upload more than #{@dropLimit} files at a time."
      type: 'Error'

    new MessageView
      container: $('#message-container')
      model: model
      useCookie: false

    @clearDrag()

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
      maxFileSize: @maxFileSize
      dropZone: @$el
      autoUpload: true
      limitMultiFileUploadSize: @maxFileSize
      dataType: "XML"
      fileInput: @$("input:file")
      url: @policy.bucket

      add: (e, data) =>
        @currentCount++
        return @dropLimitMessage() if @currentCount > @dropLimit
        data.submit()

      drop: (e, data) =>
        return @dropLimitMessage() if data.files.length > @dropLimit
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
        @currentCount = 0

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
