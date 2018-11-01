{ BLOCKS, INLINES } = require '@contentful/rich-text-types'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'

module.exports =
  srcset: (asset, srcsetSizes = [320, 640, 768, 1024, 1366, 1600, 1920, 2048]) ->
    unless asset.fields then return ''
    return  srcsetSizes.map (size) ->
      return "#{asset.fields.file.url}?w=#{size} #{size}w"
    .join ', '

  figure: (asset, { sizes = "100vw", elClass = "", srcsetSizes } = { sizes, elClass, srcsetSizes }) ->
    unless asset.fields then return ''
    figcaption = if (description = asset.fields.description) then "<figcaption>#{description}</figcaption>" else ''
    srcset = @srcset asset, srcsetSizes
    title = asset.fields.title || ''
    figure = """
      <figure>
        <img
          sizes='#{sizes}'
          srcset='#{srcset}'
          alt='#{title}'
          class='#{elClass}'
        /> #{figcaption}
      </figure>
    """
    return figure

  assetEl: (asset, options) ->
    # required: asset
    # optional: sizes, elClass, srcsetSizes
    if asset.fields and asset.fields.file.contentType.match('image.*')
      return @figure(asset, options)
    else
      return ''

    # Rendering of other media types can be supported

  formatRichTextWithImages: (raw, imageOptions) ->
    # optional: imageOptions: sizes, srcsetSizes, elClass
    footnotes = []
    renderOptions = renderNode : {}

    renderOptions.renderNode[BLOCKS.EMBEDDED_ASSET] = (node, next) =>
      asset = node.data.target
      return @assetEl(asset, imageOptions)

    formatted = documentToHtmlString raw, renderOptions
    return formatted
