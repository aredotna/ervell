
@index = (req, res, next) ->
  next() unless req.user
  res.render 'index'