import { SafariApp } from 'extension/safari-extension/background'

class PaneListener {
  public cb

  constructor(cb: () => void) {
    this.cb = cb

    // special handling for safari extension
    if (window.safariAppExtension && window.webkit) {
      SafariApp.addMessageListener('name', cb)
      return
    }

    window.addEventListener('message', cb)
  }

  destroy = () => {
    if (window.safariAppExtension && window.webkit) {
      return
    }

    window.removeEventListener('message', this.cb)
  }
}

export default PaneListener
