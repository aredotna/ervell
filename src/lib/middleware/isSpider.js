import detector from 'spider-detector'

export default (req, res, next) => {
  res.locals.sd.IS_SPIDER = detector.isSpider(req.get('user-agent'))
  next()
}
