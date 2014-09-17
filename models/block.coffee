#
# Model for a single block
#

Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class Block extends Base

  url: -> "#{sd.API_URL}/blocks/#{@id}"

  getImageSize: (size) ->
    if @has('image')
      if typeof size  == "string"
        pixels =
          large: "900"
          display: "600"
          thumb: "200"
          square: "220"
        "https://d2ss1gpcas6f9e.cloudfront.net/q/resize/#{pixels[size]}%3E/auto_orient/true/src/#{encodeURIComponent(@get('image')?[size]?.url)}"
      else
        "https://d2ss1gpcas6f9e.cloudfront.net/q/resize/#{size}%3E/auto_orient/true/src/#{encodeURIComponent(@get('image').original.url)}"

  getVisibility: ->
    if @get('class') is 'Channel'
      @get('status')
    else
      @get('visibility')

  getHref: ->
    if @get('class') is 'Channel'
      "/#{@get('user').slug}/#{@get('slug')}"
    else if @get('class') is 'User'
      "/#{@get('slug')}"
    else
      "#/block/#{@id}"