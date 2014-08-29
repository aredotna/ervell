#
# Model for a single block
#

Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class Block extends Base

  url: -> "#{sd.API_URL}/blocks/#{@id}"

  getImageSize: (size) ->
    if @has('image')
      @get('image')?[size]?.url