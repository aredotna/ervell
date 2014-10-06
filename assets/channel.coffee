#
# The javscript asset package for the channel app.
#
require('../lib/vendor/waypoints.coffee')
require('../lib/vendor/sortable.js')
$ ->
  require("../apps/channel/client.coffee").init()