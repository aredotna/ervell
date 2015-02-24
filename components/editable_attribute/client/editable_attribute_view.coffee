_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
md = require 'marked'

attributeTemplate = -> require('../templates/editable_attribute.jade') arguments...

module.exports = class EditableAttributeView extends Backbone.View
  wait: false

  className: ->
    "#{@_attribute} attribute-group #{@_isPresentClass()} #{@model.getPermissions(@currentUser)}"

  _isPresentClass: ->
    if @model.get(@_attribute) then 'is-present' else 'is-absent'

  events:
    'click .attr-value' : 'beginEdit'
    'click .save'       : 'save'
    'submit'            : 'save'
    'clickMarkdownHelp' : 'showMarkdownHelp'

  initialize: (options)->
    super

    @currentUser = mediator.shared.current_user
    @listenTo @model, 'remote:update', @render

    @_attribute = options._attribute
    @_kind = options._kind

    console.log 'model permissions', @model.getPermissions(@currentUser), @currentUser

    @render()

  beginEdit: ->
    console.log 'beginning edit', @model.allows('can-edit',  @currentUser)
    return unless @model.allows('can-edit',  @currentUser) and !@editing
    @editing = true
    @$el.addClass('is-editing')

  endEdit: ->
    @editing = false
    @$el.removeClass('is-editing')

  render: ->
    @$el.html(attributeTemplate
      id: @model.id
      attribute: @_attribute
      kind: @_kind
      value: @model.get @_attribute
      md: md
    ).addClass @className()

  showMarkdownHelp: ->
    console.log 'nothing for now'

  save: (e) ->
    e.preventDefault()

    @endEdit()

    attributes = {}
    attributes[@_attribute] = @$('.editor').val()

    afterSaved = =>
      @model.trigger 'edit:success'
      @render()

    if @wait is true
      @model.save attributes,
        success: afterSaved
    else
      @model.save attributes
      afterSaved()
