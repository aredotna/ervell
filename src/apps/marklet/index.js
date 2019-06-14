import express from 'express'

const app = express()
const router = express.Router()

app.set('views', `${__dirname}/templates`)
app.set('view engine', 'jade')

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
      console.log('Error sending bookmarklet:', err)
      res.status(err.status).end()
    }
  })
}

app.get('/save/:content', (req, res) => res.render('index'))

app.get('/loader.js', sendAsset('loader.js'))
router.get('/loader.js', sendAsset('loader.js'))
app.get('/loader.js.map', sendAsset('loader.js.map'))
router.get('/loader.js.map', sendAsset('loader.js.map'))

module.exports = app
