request = require 'superagent'
contentfulFormatter = require '../../components/contentful/helpers.coffee'
{ formatDate } = require '../../components/blog_post/helpers.coffee'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'
posts = require '../../collections/posts.coffee'

@index = (req, res, next) ->
  posts.fetchAll()
    .then (posts) ->
      res.render 'index',
        title: 'Blog'
        posts: posts
        formatDate: formatDate
        srcset: contentfulFormatter.srcset
        documentToHtmlString: documentToHtmlString
    .error next

@show = (req, res, next) ->

  slug = req.path.replace '/blog/', ''
  return next() if slug is "feed/rss"

  posts.fetchWithSlug(slug)
    .then (post) ->
      unless post
        return next();
      body = contentfulFormatter.formatRichTextWithImages(post.fields.body, { srcsetSizes: [670, 670 * 2, 670 * 3], sizes: "(min-width: 670px) 670px, 100vw" })
      res.render 'show',
        title: post.fields.title
        image: post.fields.image.fields.file.url + '?w=600'
        post: post
        formatDate: formatDate
        body: body
        bio: documentToHtmlString(post.fields.author.fields.bio)
    .error next