module.exports = (targets) ->
  original =
    width: Number targets.of[0].width
    height: Number targets.of[0].height

  return () ->
    max =
      width: targets.from.width()
      height: targets.from.height()

    aspect =
      width: original.width / max.width
      height: original.height / max.height

    return unless aspect.width > 1 or aspect.height > 1

    props = if aspect.width > aspect.height
      width: "#{max.width}px"
      height: "#{original.height / aspect.width}px"
    else
      height: "#{max.height}px"
      width: "#{original.width / aspect.height}px"

    targets.of.css props
