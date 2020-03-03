import express from 'express'
import path from 'path'

const app = express()

const siteAssociation = path.resolve(
  __dirname,
  'apple-app-site-association.json'
)

const sendSiteAssociation = (req, res) => {
  const options = { headers: { 'Content-Type': 'application/json' } }
  return res.sendFile(siteAssociation, options, err => {
    if (err) {
      res.status(err.status).end()
    }
  })
}

app.get('/(.well-known/)?apple-app-site-association', sendSiteAssociation)

module.exports = app
