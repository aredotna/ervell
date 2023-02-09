import { DateTime } from 'luxon'
import detector from 'spider-detector'

export default (req, res, next) => {
  res.locals.sd.IS_SPIDER = detector.isSpider(req.get('user-agent'))
  res.locals.sd.SEED = parseInt(DateTime.now().toUnixInteger())
  next()
}
