import express from 'express'
import useragent from 'useragent'

import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee'

import bookmarklet from 'lib/bookmarklet.coffee'

const app = express()

app.set('views', `${__dirname}/templates`)
app.set('view engine', 'jade')

const renderTools = (req, res) => {
  if (!req.params.tab) {
    return res.redirect('/tools/bookmarklet')
  }

  if (req.params.tab === 'manage') {
    return res.redirect('/manage')
  }

  if (req.params.tab === 'premium') {
    return res.redirect('/pricing')
  }

  const { tab } = req.params

  res.locals.sd.TAB = tab

  return res.render('index', {
    tab,
    bookmarklet,
    isChrome: useragent.is(req.headers['user-agent']).chrome,
    isFirefox: useragent.is(req.headers['user-agent']).firefox,
    isSafari: useragent.is(req.headers['user-agent']).safari,
  })
}

app.get('/tools', ensureLoggedInMiddleware, renderTools)
app.get('/tools/:tab', ensureLoggedInMiddleware, renderTools)

module.exports = app
