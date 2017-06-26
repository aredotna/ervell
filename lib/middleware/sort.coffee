# Set sort from cookie
#
module.exports = (req, res, next) ->
  # if the sort cookie is set, use that, otherwise default to updated_at
  sort = req.cookies.sort or 'updated_at'
  
  # override the cookie if the request has a query param
  sort = req.query.sort if req.query.sort
  
  # set the seed (for used in random sorting)
  res.locals.sd.SEED = Math.floor(Math.random() * 100000000) + 1
  
  # finally set the sort
  res.locals.sd.SORT = res.locals.sort = sort
  
  next()