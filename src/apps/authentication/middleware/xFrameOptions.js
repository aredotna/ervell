module.exports = (_req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY')
  return next()
}
