@index = (req, res, next) ->
  (user = req.user).fetch()
    .then ->
      res.render 'index',
        tab: req.params.tab
        user: user
    .catch next
