export const elVisible = el => {
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

// https://github.com/react-dropzone/react-dropzone/blob/951ecb2a03b16e192a2b0b4c8ca3d7d06061a9f1/src/utils/index.js
export const eventWithFiles = event => {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
  return Array.prototype.some.call(
    event.dataTransfer.types,
    type => type === 'Files' || type === 'application/x-moz-file'
  )
}

export default {
  elVisible,
  touch,
  eventWithFiles,
}
