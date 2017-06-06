tips = require "./content.coffee"
{ reject } = require 'underscore'


module.exports = 
  addTips: (user, author, cookies) ->
    if (user?.id is author.id and user?.get('show_tour') isnt false)
      reject tips, (tip) -> cookies[tip.id]

  