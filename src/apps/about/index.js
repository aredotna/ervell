import express from 'express'

import apolloMiddleware from 'v2/apollo/middleware'
import GroupsPage from 'v2/pages/about/GroupsPage'

const app = express()

app.set('views', `${__dirname}/templates`)
app.set('view engine', 'jade')

const middlewareStack = [apolloMiddleware]

app
  .get('/terms', (req, res) => res.render('terms'))
  .get('/form-c', (req, res) => res.render('form-c'))
  .get('/privacy', (req, res) => res.render('privacy'))
  .get('/faqs', (req, res) => res.render('faqs'))
  .get('/experiments', (req, res) => res.render('experiments'))
  .get('/community-guidelines', (req, res) => res.render('community'))
  .get('/thankyou', (req, res) => res.render('thankyou'))
  .get('/getting-started-with-groups', ...middlewareStack, (req, res) =>
    req.apollo
      .render(GroupsPage)
      .then(apollo => res.render('groups', { apollo }))
  )

module.exports = app
