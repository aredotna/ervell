Chaplin = require 'chaplin'


Delayer = _.extend
  # Override default delayer methods to match native
  # method signature and not require a name
  setTimeout: (first, second, third)->
    args = identifyArgs(first, second, third)
    super(args.name, args.time, args.handler)

  setInterval: (first, second, third)->
    args = identifyArgs(first, second, third)
    super(args.name, args.time, args.handler)

  # Alias for setTimeout
  delay: (first, second, third)->
    args = identifyArgs(first, second, third)
    @setTimeout(args.name, args.time, args.handler)

  # Shortcut for 0 length timeout
  defer: (first, second)->
    args = identifyArgs(first, second)
    args.time = 0
    @setTimeout(args.name, args.time, args.handler)

, Chaplin.Delayer


module.exports = Delayer

# Private

identifyArgs = (first, second, third)->
  if typeof first is "string"
    name: first
    handler: second
    time: third
  else
    name: uniqueId()
    handler: first
    time: second

uniqueId = ->
  id = ""
  id += Math.random().toString(36).substr(2) while id.length < 8
  id.substr 0, 8
  id
