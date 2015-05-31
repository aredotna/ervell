_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'
EditableAttributeView = require './editable_attribute_view.coffee'
md = require 'marked'

attributeTemplate = -> require('../templates/editable_attribute.jade') arguments...

module.exports = class MetaEditableAttributeView extends EditableAttributeView

  _isPresentClass: ->
    if @model.get('metadata')[@_attribute] then 'is-present' else 'is-absent'

  render: ->
    @$el.html(attributeTemplate
      id: @model.id
      attribute: @_attribute
      kind: @_kind
      value: @model.get('metadata')?[@_attribute]
      md: md
    ).addClass @className()

  save: (e)=>
    e.preventDefault()

    @endEdit()

    afterSaved = =>
      @model.trigger 'edit:success'
      @render()

    if @wait is true
      @model.saveMeta @_attribute, @$('.editor').val(),
        success: afterSaved
    else
      @model.saveMeta @_attribute, @$('.editor').val()
      afterSaved()?
