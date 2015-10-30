#
# Collection for a group of Comments
#

Base = require("./base.coffee")
Comment = require '../models/comment.coffee'
sd = require("sharify").data
_ = require 'underscore'

module.exports = class Comments extends Base

  model: Comment

  url: -> "#{sd.API_URL}/blocks/#{@block.id}/comments"

  initialize: (models, {@block})->
    super

  comparator: (comment)->
    new Date(comment.get('created_at')).valueOf()

  parse: (data)-> data.comments
