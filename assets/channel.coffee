#
# The javscript asset package for the channel app.
#
$ ->
  require('../lib/vendor/backpusher.js')
  require('../apps/channel/client.coffee').init()
