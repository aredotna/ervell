Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
newCollaboratorTemplate = -> require('../templates/new_collaborator.jade') arguments...
collaboratorResultsTemplate = -> require('../templates/collaborator_results.jade') arguments...

module.exports = class newCollaboratorView extends Backbone.View

  events:
    'keyup #new-collaborator__search' : 'searchCollaborators'
    'click .new-collaborator__add'    : 'openSearch'

  initialize: (options)->
    @channel = options.channel
    @currentCollaborators = options.collaborators
    @render()

  maybeClear: (e)=>
    @clear() unless $(e.target).closest('#metadata--collaborators').length

  searchCollaborators: ->
    query = @$('#new-collaborator__search').val()

    console.log 'searchCollaborators', query

    $.get "#{sd.API_URL}/search/users/?q=#{query}&per=10", (response) =>
      # IDs of the current channel collaborators, author
      ids = @currentCollaborators.pluck 'id'
      ids.push @channel.get('user').id

      if response.length > 1
        @results = _.reject response.users, (user) -> _.contains(ids, user.id)
      else
        @results = response.users if not _.contains ids, response.users.id

      # Set the results
      @showResults()

  showResults: ->
    console.log 'results', @results
    @$('.new-collaborator__results').html collaboratorResultsTemplate collaborators: @results

  openSearch: ->
    @$el.addClass 'is-active'
    @$('#new-collaborator__search').focus()
    $(window).one 'tap', @maybeClear

  render: ->
    @$el.html newCollaboratorTemplate()

  clear: ->
    $(window).off 'tap', @maybeClear
    @$el.removeClass 'is-active'
