Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
analytics = require '../../../../lib/analytics.coffee'
Collaborators = require '../../../../collections/collaborators.coffee'

newCollaboratorTemplate = -> require('./templates/new.jade') arguments...
inviteTemplate = -> require('./templates/invite.jade') arguments...
resultsTemplate = -> require('./templates/results.jade') arguments...

module.exports = class NewCollaboratorView extends Backbone.View

  events:
    'keyup .new-collaborator__search' : 'searchCollaborators'
    'click .js-collaborator-result' : 'addCollaborator'
    'click .js-collaborator-invite' : 'inviteCollaborator'

  initialize: ({ @channel, @collaborators} )->
    @render()

  addCollaborator: (e) ->
    @collaborators._add @results.get $(e.currentTarget).data 'id'

  inviteCollaborator: (e) ->
    @collaborators._invite $(e.currentTarget).data 'email'

  isEmail: (query)->
    is_email = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    is_email.test query

  searchCollaborators: ->
    query = @$input.val()

    if @isEmail query
      @showInvite query
    else
      $.get "#{sd.API_URL}/search/users/?q=#{query}&per=6", (response) =>
        # IDs of the current channel collaborators, author
        ids = @collaborators.pluck 'id'
        ids.push @channel.get('user').id

        if response.length > 1
          results = _.reject response.users, (user) -> 
            _.contains ids, parseInt(user.id)
        else
          results = response.users if not _.contains ids, response.users.id
        
        @results = new Collaborators results
        @showResults()

  showInvite: (email) ->
    @$('.js-collaborator-results').html inviteTemplate 
      email: email

  showResults: ->
    @$('.js-collaborator-results').html resultsTemplate 
      collaborators: @results.models

  removeResults: ->
    @$('.js-collaborator-results').html ""

  openSearch: ->
    @$el.addClass 'is-active'
    @$input.focus()
    $(window).one 'tap', @clear

  clear: =>
    $(window).off 'tap', @clear
    @$el.removeClass 'is-active'
    @removeResults()

  render: ->
    @$el.html newCollaboratorTemplate()

    @_postRender()

  _postRender: ->
    @$input = @$('input.new-collaborator__search')
    @openSearch()

  
