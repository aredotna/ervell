express = require 'express'
{ NODE_ENV } = require '../config'

app = module.exports = express()

# Normal routing
console.time('actions')
app.use(require('../apps/actions'))
console.timeEnd('actions')

console.time('home')
app.use(require('../apps/home'))
console.timeEnd('home')

console.time('authentication')
app.use(require('../apps/authentication'))
console.timeEnd('authentication')

console.time('getting_started')
app.use(require('../apps/getting_started'))
console.timeEnd('getting_started')

console.time('util')
app.use(require('../apps/util'))
console.timeEnd('util')

console.time('about')
app.use(require('../apps/about'))
console.timeEnd('about')

console.time('manage')
app.use(require('../apps/manage'))
console.timeEnd('manage')

console.time('marklet')
app.use(require('../apps/marklet'))
console.timeEnd('marklet')

console.time('import')
app.use(require('../apps/import'))
console.timeEnd('import')

console.time('settings')
app.use(require('../apps/settings'))
console.timeEnd('settings')

console.time('onboarding')
app.use(require('../apps/onboarding'))
console.timeEnd('onboarding')

console.time('graphql')
app.use(require('../apps/graphql'))
console.timeEnd('graphql')

console.time('examples')
app.use(require('../apps/examples'))
console.timeEnd('examples')

console.time('vanity_redirects')
app.use(require('../apps/vanity_redirects'))
console.timeEnd('vanity_redirects')

console.time('deeplink')
app.use(require('../apps/deeplink'))
console.timeEnd('deeplink')

console.time('apple-site-association')
app.use(require('../apps/apple_site_association'))
console.timeEnd('apple-site-association')

console.time('rss')
app.use(require('../apps/rss'))
console.timeEnd('rss')

# All other SPA / client-side routes
console.time('app')
app.use(require('../apps/app'))
console.timeEnd('app')


