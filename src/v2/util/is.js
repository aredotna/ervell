const elVisible = el => {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const touch = () =>
  'ontouchstart' in window || 'onmsgesturechange' in window

export default {
  elVisible,
  touch,
}
