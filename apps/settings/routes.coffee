@index = (req, res, next) ->
  user = req.user
  customer = user.related().customer
  customer.authenticate(user.get('access_token'))

  Promise.all [
    user.fetch()
    customer.fetch()
      .catch -> #
  ]
    .then ->
      res.locals.sd.USER = user.toJSON()
      res.locals.sd.CUSTOMER = customer.toJSON()

      res.render 'index',
        tab: req.params.tab
        user: user
        customer: customer

    .catch next
