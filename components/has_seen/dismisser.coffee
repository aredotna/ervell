{ defaults } = require 'underscore'
Cookies = require 'cookies-js'

module.exports = class Dismisser
  defaults:
    key: null
    limit: 1
    expires: 31536000 # 1 Year

  constructor: (options = {}) ->
    { @key, @limit, @expires } = defaults options, @defaults

  tick: =>
    return if @dismissed()
    @persist @get() + 1

  persist: (n) ->
    Cookies.set @key, n, expires: @expires

  get: ->
    parseInt(Cookies.get @key) or 0

  dismiss: =>
    @persist @limit

  dismissed: ->
    @get() >= @limit
