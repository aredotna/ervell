{ BLOCKS } = require '@contentful/rich-text-types'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'
cheerio = require 'cheerio'

module.exports =
  metaImage: (image) ->
    return '' unless image.fields
    return "https:#{image.fields.file.url}?w=1024"

  srcset: (image, srcsetSizes = [320, 640, 768, 1024, 1366, 1600, 1920, 2048]) ->
    return '' unless image.fields
    return  srcsetSizes.map (size) ->
      return "#{image.fields.file.url}?w=#{size} #{size}w"
    .join ', '

  image: (image, { sizes = "100vw", elClass = "", srcsetSizes } = { sizes, elClass, srcsetSizes }) ->
    return '' unless image.fields
    figcaption = if (description = image.fields.description) then "<figcaption>#{description}</figcaption>" else ''
    srcset = @srcset image, srcsetSizes
    title = image.fields.title || ''
    return """
      <img
        sizes='#{sizes}'
        srcset='#{srcset}'
        alt='#{title}'
        class='#{elClass}'
      />
    """

  figCaption: (image) ->
    return '' unless image.fields?.description
    return "<figcaption>#{image.fields.description}</figcaption>"

  formatRichTextWithImages: (raw, imageOptions) ->
    # optional: imageOptions: sizes, srcsetSizes, elClass
    renderOptions = renderNode : {}

    renderOptions.renderNode[BLOCKS.EMBEDDED_ASSET] = (node, next) =>
      image = node.data.target
      return """
        <figure class='contentful-asset' data-asset-id=#{image.sys.id}>
          #{@image(image, imageOptions)}
          #{@figCaption(image)}
        </figure>
      """
    return documentToHtmlString raw, renderOptions

  formatRichTextFootnotes: (raw) ->
    n = 0
    renderOptions = renderNode : {}
    renderOptions.renderNode[BLOCKS.LIST_ITEM] = (node, next) ->
      n++
      return "<li id=#{n}>" + next(node.content) + "</li>"
    return documentToHtmlString raw, renderOptions


