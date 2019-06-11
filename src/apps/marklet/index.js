import express from 'express'

const app = express()

app.set('views', `${__dirname}/templates`)
app.set('view engine', 'jade')

const resolve = (_req, res) => {
  res.render('index')
}

app.get('/save/:content', resolve)

module.exports = app
