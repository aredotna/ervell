import express from 'express'

const app = express()

app.get('/good-sign-offs', (_req, res) =>
  res.redirect('/meg-miller/good-sign-offs')
)

module.exports = app
