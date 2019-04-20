Dismisser = require './dismisser.coffee'

module.exports = (options = {}) ->
  dismisser = new Dismisser options

  if dismisser.dismissed()
    true
  else
    dismisser.dismiss()
    false
