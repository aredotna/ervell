{ parse } = require 'url'
validator = require 'validator'

@save = (req, res, next) ->
  next() unless req.user
  res.render 'index',
    content: req.params.content
    isURL: validator.isURL req.params.content