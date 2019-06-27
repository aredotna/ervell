const Redis = require('redis')
const cache = require('../cache.coffee')
const { RateLimiterRedis } = require('rate-limiter-flexible')
const { RateLimiterMemory } = require('rate-limiter-flexible')

const {
  RATE_LIMIT_TOTAL_POINTS,
  RATE_LIMIT_LOGGED_IN_POINTS,
  RATE_LIMIT_LOGGED_OUT_POINTS,
  RATE_LIMIT_DURATION,
} = require('../../config.coffee')

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: cache.client,
  points: RATE_LIMIT_TOTAL_POINTS,
  duration: RATE_LIMIT_DURATION,
})

const rateLimiterMemory = new RateLimiterMemory({
  points: RATE_LIMIT_TOTAL_POINTS,
  duration: RATE_LIMIT_DURATION,
})

const rateLimiter = cache.client ? rateLimiterRedis : rateLimiterMemory

export const rateLimiterMiddleware = (req, res, next) => {
  const loggedIn = req.user && !!req.user.id
  const key = loggedIn ? req.user.id : req.ip
  const pointsToConsume = loggedIn
    ? RATE_LIMIT_LOGGED_IN_POINTS
    : RATE_LIMIT_LOGGED_OUT_POINTS

  return rateLimiter
    .consume(key, pointsToConsume)
    .then(() => {
      next()
    })
    .catch(err => {
      console.log(`RATE LIMITED ${req.ip}`, err)
      res.status(429).send('Too Many Requests')
    })
}

export default rateLimiterMiddleware
