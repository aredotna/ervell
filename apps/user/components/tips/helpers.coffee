{ reject } = require 'underscore'
tips = require './content.coffee'

module.exports =
  addTips: (user, author, cookies) ->
    if user?.id is author.id and user?.get('show_tour')
      reject tips, (tip) -> cookies[tip.id]
