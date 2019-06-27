export default (req, res, next) => {
  if (/HeadlessChrome/.test(req.headers['user-agent'])) {
    console.log('Headless chrome prevented:', req.headers['user-agent'])
    return res.status(403).end()
  }
  next()
}
