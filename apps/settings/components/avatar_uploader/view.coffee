Promise = require 'bluebird-q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
uuid = require '../../../../lib/uuid.coffee'
template = -> require('./index.jade') arguments...

module.exports = class AvatarUploaderView extends Backbone.View
  class: 'avatar-uploader'

  events:
    'click .js-submit': 'proxyClick'

  initialize: ->
    @listenTo @model, 'change:avatar_image', @render

  proxyClick: (e) ->
    e.preventDefault()
    @$('input:file').trigger('click')

  save: (url) ->
    $.ajax
      type: 'PUT'
      # TODO: allow this to be updated through normal user POST
      url: "#{API_URL}/accounts/avatar"
      data: url: url

    poll = () =>
      @model.fetch().then =>
        unless @model.hasChanged 'avatar_image'
          setTimeout poll, 1000
        else
          @els.submit.text 'Avatar updated'

    poll()

  render: ->
    @$el.html template
      user: @model
      policy: @model.related().policy

    @postRender()

    this

  postRender: ->
    @els =
      form: @$('.js-upload')
      submit: @$('.js-submit')

    @els.form.fileupload
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      maxFileSize: 20971520 # 20MB
      dropZone: @$el
      singleFileUploads: true
      autoUpload: true
      dataType: 'XML'
      fileInput: @$('input:file')
      url: @model.related().policy.get('bucket')

      formData: (form) ->
        data = form.serializeArray()
        fileType = @files[0]?.type or ''
        data.push name: 'Content-Type', value: fileType
        data[0].value = data[0].value.replace ':uuid', uuid()
        data

      fail: (e, data) =>
        @els.submit.text 'Upload failed'

      start: (e, data) =>
        @els.submit.text 'Uploading'

      done: (e, data) =>
        parsed = $.parseXML(data.jqXHR.responseText)
        location = $(parsed).find('Location').text()

        @els.submit.text 'Processing'
        @save location

  remove: ->
    @els.form.fileupload('destroy')
    super
