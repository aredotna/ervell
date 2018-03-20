Dismisser = require '../has_seen/dismisser.coffee'
analytics = require '../../lib/analytics.coffee'

module.exports = ->
  dismisser = new Dismisser
    key: 'invest_cta'
    limit: 1
    expires: 2628000 # 1 month

  $el = $('.js-invest-cta')

  $el.one 'click', '.js-close', ->
    analytics.track.click 'Closed Invest CTA'
    dismisser.dismiss()
    $el.remove()
