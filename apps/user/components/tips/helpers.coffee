tips = require "./content.coffee"
{ reject } = require 'underscore'


module.exports = 
  addTips: (user, author, cookies) ->
    if (user?.id is author.id)
      reject tips, (tip) -> cookies[tip.id]

  