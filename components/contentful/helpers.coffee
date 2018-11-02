{ BLOCKS, INLINES } = require '@contentful/rich-text-types'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'
cheerio = require 'cheerio'

module.exports =
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
    return unless image.fields and image.fields.description
    return "<figcaption>#{image.fields.description}</figcaption>"

  formatRichTextWithImagePlaceholders: (raw, imageOptions) ->
    # optional: imageOptions: sizes, srcsetSizes, elClass
    imageIds = []
    renderOptions = renderNode : {}

    renderOptions.renderNode[BLOCKS.EMBEDDED_ASSET] = (node, next) =>
      id = node.data.target.sys.id
      imageIds.push id
      return "<figure class='contentful-asset' data-asset-id=#{id}></figure>"
    body = documentToHtmlString raw, renderOptions
    return { body, imageIds }

  replaceImagePlaceholders: (body, images, imageOptions) ->
    $ = cheerio.load(body)
    $('figure.contentful-asset').each (i, el) =>
      image = images.find (image) =>
        return image.sys.id == $(el).attr('data-asset-id')
      $(el).append(@image(image, imageOptions))
      $(el).append(@figCaption(image))
    return $.html()


