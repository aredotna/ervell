resizeIframes = ->
  newHeight = $("iframe").contents().find("html").height()
  $("iframe").height newHeight

$ ->
  resizeIframes()
  $(window).resize resizeIframes
