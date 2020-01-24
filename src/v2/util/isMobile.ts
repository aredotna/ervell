export function isMobile() {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  )
}
