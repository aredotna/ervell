qs = require 'qs'
url = require 'url'

module.exports = (req, res) ->
  root = '/'
  referrer = url.parse req.get('Referrer') or root
  query = qs.parse referrer.query
  res.redirect query['redirect-to'] or referrer.path or root
