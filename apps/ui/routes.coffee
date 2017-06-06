{ extend } = require 'underscore'

colors = require '../../components/ui/colors/colors.json'
font = require '../../components/ui/typography/font.json'

@index = (_req, res) ->
  res.render 'index', extend {}, colors, font

@page = (req, res) ->
  res.render "pages/#{req.params.page}"
