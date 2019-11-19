export default (req, _res, next) => {
  if (!req.user) return next()

  req.user.fetch({
    headers: {
      'X-AUTH-TOKEN': req.user.get('access_token'),
    },
    error: (_user, err) => {
      next(err)
    },
    success: () => {
      req.login(req.user, error => {
        if (error) {
          return next(error)
        }

        return next()
      })
    },
  })
}
