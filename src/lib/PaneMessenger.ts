class PaneMessenger {
  public el

  constructor(el) {
    this.el = el
  }

  send = ({ action, value }) => {
    // special handling for safari extension
    if (window.safariAppExtension && window.webkit) {
      window.webkit.messageHandlers.arenaApp.postMessage(
        JSON.stringify({ action, value })
      )
    }

    if (!this.el) return false

    return this.el.postMessage({ action, value }, '*')
  }
}

export default PaneMessenger
