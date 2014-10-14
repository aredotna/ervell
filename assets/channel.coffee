#
# The javscript asset package for the channel app.
#
loadChannelModules =->
  $ = require 'jquery'
  console.log '$', $
  require('../lib/vendor/waypoints.coffee')
  # require('../lib/vendor/sortable.js')
  require("../apps/channel/client.coffee").init()

require('jquery') loadChannelModules()
