{ reject } = require 'underscore'

module.exports =
  addTips: (cookies, tips) -> reject tips, (tip) -> cookies[tip.id]
