@index = (req, res, next) ->
  user = req.user
  { customer, policy } = user.related()
  policy.authenticate(user.get('access_token'))
  customer.authenticate(user.get('access_token'))

  Promise.all [
    user.fetch()
    policy.fetch()
    customer.fetch()
      .catch -> #
  ]
    .then ->
      res.locals.sd.USER = user.toJSON()
      res.locals.sd.POLICY = policy.toJSON()
      res.locals.sd.CUSTOMER = customer.toJSON()

      res.render 'index',
        tab: req.params.tab
        user: user
        policy: policy
        customer: customer

    .catch next
