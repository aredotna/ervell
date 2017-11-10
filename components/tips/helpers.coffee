{ reject } = require 'underscore'

module.exports =
  addTips: (user, author, cookies, tips) ->
    # and user?.get('show_tour')
    if user?.id is author?.id 
      reject tips, (tip) -> cookies[tip.id]
