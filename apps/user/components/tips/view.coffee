Backbone = require 'backbone'
Cookies = require 'cookies-js'

analytics = require '../../../../lib/analytics.coffee'
mediator = require '../../../../lib/mediator.coffee'

module.exports = class TipView extends Backbone.View

  events: 
    'click': 'handleClick'
    'click .js-close' : 'removeTip'

  removeTip: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()
    @setClosed()
    @remove()

  setClosed: ->
    analytics.track.click "Block tip closed", id: @model.id
    Cookies.set @model.id, true

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @setClosed()

    if trigger = @$el.data('trigger')
      switch trigger
        when "new:channel"
          # jQuery to open the new channel dialog, and close when body is clicked
          $dropdown = $('.js-channel-create .js-dropdown')
          $dropdown.show()
          $('body').on 'click', (e) ->
            unless $(e.currentTarget).closest('js-channel-create').length
              $dropdown.hide()

    else
      window.location = @$el.attr('href')
    
    @remove()

  remove: ->
    @model.collection.remove @model
    super
    

