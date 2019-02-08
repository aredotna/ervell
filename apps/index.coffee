express = require 'express'
{ NODE_ENV } = require '../config'

app = module.exports = express()

# Normal routing
console.time('actions')
app.use(require('../apps/actions'))
console.timeEnd('actions')

console.time('feed')
app.use(require('../apps/feed'))
console.timeEnd('feed')

console.time('explore')
app.use(require('../apps/explore'))
console.timeEnd('explore')

console.time('home')
app.use(require('../apps/home'))
console.timeEnd('home')

console.time('blog')
app.use(require('../apps/blog'))
console.timeEnd('blog')

console.time('authentication')
app.use(require('../apps/authentication'))
console.timeEnd('authentication')

console.time('confirmation')
app.use(require('../apps/confirmation'))
console.timeEnd('confirmation')

console.time('getting_started')
app.use(require('../apps/getting_started'))
console.timeEnd('getting_started')

console.time('tools')
app.use(require('../apps/tools'))
console.timeEnd('tools')

console.time('util')
app.use(require('../apps/util'))
console.timeEnd('util')

console.time('about')
app.use(require('../apps/about'))
console.timeEnd('about')

console.time('search')
app.use(require('../apps/search'))
console.timeEnd('search')

console.time('manage')
app.use(require('../apps/manage'))
console.timeEnd('manage')

console.time('share')
app.use(require('../apps/share'))
console.timeEnd('share')

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

# Dynamic routing (in order)
console.time('profile')
app.use(require('../apps/profile'))
console.timeEnd('profile')

console.time('block')
app.use(require('../apps/block'))
console.timeEnd('block')

console.time('channel')
app.use(require('../apps/channel'))
console.timeEnd('channel')

console.time('rss')
app.use(require('../apps/rss'))
console.timeEnd('rss')

# Ennvironment specific
switch NODE_ENV
  when 'development'
    app.use require '../apps/statuses'
