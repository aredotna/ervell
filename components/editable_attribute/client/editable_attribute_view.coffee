_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
md = require 'marked'
xss = require 'xss'

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

  initialize: ({ @_attribute, @_kind, @wait })->
    @currentUser = mediator.shared.current_user
    @listenTo @model, 'remote:update', @render
    @listenTo @model, 'change', @render

    md.setOptions		
      renderer: new md.Renderer(),		
      gfm: false
      tables: true
      breaks: true	
      pedantic: false		
      smartLists: true
      smartypants: false

    @render()

  beginEdit: ->
    return unless @model.allows('can-edit',  @currentUser) and !@editing

    analytics.track.click "#{@_attribute} edited",
      label: analytics.modelNameAndIdToLabel @model.get('base_class'), @model.id

    @editing = true
    @$el.addClass('is-editing')
    _.defer => @$('.editor').focus()

  endEdit: ->
    @editing = false
    @$el.removeClass('is-editing')

  render: ->
    @$el.html(@getTemplate @getRenderData())
      .addClass @className()

  getTemplate: ->
    require('../templates/editable_attribute.jade') arguments...

  getRenderData: ->
    html = if @model.has(@_attribute) then _.unescape(md(@model.get(@_attribute))) else ''

    id: @model.id
    attribute: @_attribute
    kind: @_kind
    value: _.unescape(@model.get @_attribute)
    value_html: _.unescape(html)
    canEdit: _s.contains @model.getPermissions(@currentUser), 'can-edit'

  showMarkdownHelp: ->
    console.log 'nothing for now'

  save: (e) ->
    e.preventDefault()

    @endEdit()

    attributes = {}
    attributes[@_attribute] = xss @$('.editor').val()

    afterSaved = =>
      @model.trigger 'edit:success'
      @model.trigger "edit:#{@_attribute}:success"
      @render()

    if @wait is true
      @model.save attributes,
        silent: true
        success: afterSaved
    else
      @model.save attributes, silent: true
      afterSaved()
