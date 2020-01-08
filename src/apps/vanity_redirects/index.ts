import express from 'express'

const app = express()

app.get('/good-sign-offs', (_req, res) =>
  res.redirect('/meg-miller/good-sign-offs')
)

app.get('/blog/when-it-changed-part-2', (_req, res) =>
  res.redirect(
    '/blog/when-it-changed-part-2-tracing-the-corporatization-of-the-web'
  )
)

app.get('/blog/when-it-changed-part-3', (_req, res) =>
  res.redirect('/blog/when-it-changed-part-3-an-ambient-aftermath')
)

module.exports = app
