module.exports =
  isIPad: isIPad = ->
    navigator.userAgent.toLowerCase()
      .indexOf('ipad') > -1

  # http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  isTouch: isTouch = ->
    'ontouchstart' of window or 'onmsgesturechange' of window

  isPhoneLike: ->
    isTouch() and not isIPad()

  autofocus: ->
    if isTouch() then undefined else true

  isRetina: ->
    (window.devicePixelRatio or 1) > 1

  isFirefox: ->
    navigator.userAgent.toLowerCase()
      .indexOf('firefox') > -1

  isMobile: ->
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test navigator.userAgent
