Chaplin = require 'chaplin'
_ = require 'underscore'

ModelLib =
  setOptions: (options={})->
    defaults = @defaultOptions || {}
    current = @options || {}
    @options = _.extend {}, defaults, current, options

  subscribeNext: (type, handler)->
    that = this
    handler = ((handler)->
      (data)->
        that.unsubscribeEvent(type, handler)
        handler(data)?
    )(handler)

    @subscribeEvent(type, handler)


module.exports = _.extend ModelLib, Chaplin.SyncMachine
