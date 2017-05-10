{ extend } = require 'underscore'

colors = require '../../components/ui/colors/colors.json'
font = require '../../components/ui/typography/font.json'

@index = (req, res, next) ->
  res.render 'index', extend {}, colors, font
