import express from 'express'
import redis from 'redis'
import apolloMiddleware from 'v2/apollo/middleware'
import withStaticRouter from 'v2/hocs/WithStaticRouter'
import pageResolver from 'v2/components/UI/XmlPage/resolver'
import { Routes } from './Routes'

import { REDIS_URL } from 'config.js'

const client = redis.createClient(REDIS_URL, {
  retry_strategy: () => undefined,
})

client.on('error', err => {
  console.error('Error connecting to Redis', err)
})

const expiresIn = 60 * 10 * 10

const setCache = (key, data) => {
  if (!client || !client.connected) return null
  client.set(key, data)
  client.expire(key, expiresIn)
}

const getCache = (key, callback) => {
  if (!client || !client.connected) return callback()
  return client.get(key, callback)
}

const middlewareStack = [apolloMiddleware]

const app = express()

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    const key = req.originalUrl
    getCache(key, (err, data) => {
      if (err) return next(err)
      if (data) {
        res.status(200)
        res.send(data)
        res.end()
      } else {
        req.apollo
          .render(withStaticRouter(Routes), {}, { mode: 'bare' })
          .then(apolloRes => {
            const feed = pageResolver({ apolloRes })
            setCache(key, feed)

            res.status(200)
            res.send(feed)
            res.end()
          })
          .catch(err => {
            return next(err)
          })
      }
    })
  },
]

app.get('/explore/feed/rss', ...resolve)
app.get('/:username/feed/rss', ...resolve)
app.get('/:username/:slug/feed/rss', ...resolve)

// TODO: reimplement this
// app.get("/blog/feed/rss", ...resolve)

module.exports = app
