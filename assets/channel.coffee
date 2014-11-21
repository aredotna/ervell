#
# The javscript asset package for the channel app.
#
$ ->
  require('../node_modules/jquery.ui.widget/jquery.ui.widget.js')
  require('../node_modules/blueimp-file-upload/js/jquery.iframe-transport.js')
  require('../node_modules/blueimp-file-upload/js/jquery.fileupload.js')
  require('../lib/vendor/backpusher.js')
  require('../apps/channel/client.coffee').init()
