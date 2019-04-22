#
# The javscript asset package for the channel app.
#
$(document).ready ->
  require('../lib/vendor/backpusher.js')
  require('../apps/channel/client/index.coffee')()
