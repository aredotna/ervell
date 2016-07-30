{ HomeView } = require "../apps/root/client.coffee"
console.log 'HomeView', HomeView

$ ->
  new HomeView el: $ '.container'

