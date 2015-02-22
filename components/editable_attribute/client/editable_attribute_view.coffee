_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

attributeTemplate = -> require('../templates/editable_attribute.jade') arguments...

module.exports = class EditableAttributeView extends Backbone.View
  className: 'attribute-group'

  events:
    'click .attr-value' : 'beginEdit'
    'click .save'       : 'save'
    'submit'            : 'save'
    'clickMarkdownHelp' : 'showMarkdownHelp'

  initialize: (options)->
    super

    @currentUser = mediator.shared.user
    @listenTo @model, 'remote:update', @render

    @_attribute = options._attribute
    @_kind = options._kind

    console.log 'initing EditableAttributeView for', @_attribute, @_kind

  beginEdit: ->
    return unless @model.allows('can-edit',  @currentUser) and !@editing
    @editing = true
    @$el.addClass('is-editing')

  endEdit: ->
    @editing = false
    @$el.removeClass('is-editing')

  render: ->
    @$el.html attributeTemplate attribute: @_attribute, kind: @_kind

  showMarkdownHelp: ->
    console.log 'nothing for now'

  save: (e) ->
    e.preventDefault()

    @endEdit()

    attributes = {}
    attributes[@options.locals._attribute] = @$('.editor').val()

    afterSaved = =>
      @model.trigger 'edit:success'
      @render()

    if @options.wait is true
      @model.save attributes,
        success: afterSaved
    else
      @model.save attributes
      afterSaved()
