marked = require 'marked'

renderer = new marked.Renderer
renderer.image = -> '' # Disables images

MARKDOWN_OPTIONS =
  renderer: renderer
  gfm: true
  tables: false
  breaks: true
  pedantic: false
  sanitize: true
  smartLists: true
  smartypants: true

module.exports = (string) ->
  string = string.replace /&gt;+/g, '>' # Support for blockquotes

  marked(string, MARKDOWN_OPTIONS)
