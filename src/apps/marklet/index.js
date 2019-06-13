import express from 'express'

const app = express()
const router = express.Router()

app.set('views', `${__dirname}/templates`)
app.set('view engine', 'jade')

const loaderJS = (req, res) => {
  const options = {
    root: 'public/assets',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  }

  return res.sendFile('loader.js', options, err => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:')
    }
  })
}

app.get('/save/:content', (req, res) => res.render('index'))
app.get('/loader.js', loaderJS)
router.get('/loader.js', loaderJS)

module.exports = app
