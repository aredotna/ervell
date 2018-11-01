{ BLOCKS, INLINES } = require '@contentful/rich-text-types'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'

module.exports =
  srcset: (asset, srcsetSizes = [320, 640, 768, 1024, 1366, 1600, 1920, 2048]) ->
    return if asset.fields then srcsetSizes.map( (size) ->
      return "#{asset.fields.file.url}?w=#{size} #{size}w"
    ).join(', ') else ''

  figure: (asset, { sizes = "100vw", elClass = "", srcsetSizes } = { sizes, elClass, srcsetSizes })->
    return if asset.fields then """
      <figure>
        <img
          sizes='#{sizes}'
          srcset='#{@srcset asset, srcsetSizes}'
          alt='#{asset.fields.title || ''}'
          class='#{elClass}'
        />
        <figcaption>#{asset.fields.description}</figcaption>
      </figure>
    """ else ""

  assetEl: (asset, options) ->
    # required: asset
    # optional: sizes, elClass, srcsetSizes
    if asset.fields and fasset.fields.file.contentType.match('image.*')
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
