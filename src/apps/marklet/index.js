import express from 'express'
import pageResolver from 'v2/components/UI/Page/resolver'
import apolloMiddleware from 'v2/apollo/middleware'
import { BlankLayout } from 'v2/components/UI/Layouts/BlankLayout'

const app = express()
const router = express.Router()

const sendAsset = asset => (req, res) => {
  const options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  }

  return res.sendFile(asset, options, err => {
    if (err) {
      res.status(err.status).end()
    }
  })
}

app.get('/save/:content', apolloMiddleware, (req, res, next) => {
  return req.apollo
    .render(BlankLayout, null, { mode: 'page' })
    .then(apolloRes => {
      pageResolver({
        bundleName: 'bookmarklet',
        apolloRes,
        res,
      })
    })
    .catch(next)
})

app.get('/loader.js', sendAsset('loader.js'))
router.get('/loader.js', sendAsset('loader.js'))
app.get('/loader.js.map', sendAsset('loader.js.map'))
router.get('/loader.js.map', sendAsset('loader.js.map'))

module.exports = app
