const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i

export default function isHexColor(str) {
  return hexcolor.test(str)
}
