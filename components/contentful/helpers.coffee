{ BLOCKS } = require '@contentful/rich-text-types'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'

module.exports =
  srcset: (asset, srcsetSizes = [320, 640, 768, 1024, 1366, 1600, 1920, 2048]) ->
    return srcsetSizes
      .map (size) ->
        return "#{asset.fields.file.url}?w=#{size} #{size}w"
      .join ', '

  imgEl: (asset, { sizes, elClass, srcsetSizes } = { sizes: "100vw", elClass: '', srcsetSizes })->
    return """
      <img
        sizes='#{sizes}'
        srcset='#{this.srcset asset, srcsetSizes}'
        alt='#{asset.fields.title || ''}'
        class='#{elClass}'
      />
    """

  assetEl: (asset, options) ->
    # required: asset
    # optional: sizes, elClass, srcsetSizes

    if asset.fields.file.contentType.match('image.*')
      return @imgEl(asset, options)
    else
      return ''

    # Rendering of other media types can be supported

  captionEl: (asset) ->
    # required: asset
    # optional: sizes, elClass, srcsetSizes
    return "<p>#{asset.fields.description}</p>"

  formatRichTextWithImages: (raw, imageOptions) ->
    # optional: imageOptions: sizes, srcsetSizes, elClass

    renderOptions = renderNode : {}
    renderOptions.renderNode[BLOCKS.EMBEDDED_ASSET] = (node, next) =>
      asset = node.data.target
      return @assetEl(asset, imageOptions) + @captionEl(asset)

    return documentToHtmlString raw, renderOptions
