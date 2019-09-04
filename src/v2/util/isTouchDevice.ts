// Extracted from https://stackoverflow.com/posts/4819886/revisions
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints
}
