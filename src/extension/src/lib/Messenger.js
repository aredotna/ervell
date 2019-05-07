class Messenger {
  constructor(el) {
    this.el = el
  }

  send = ({ action, value }) => {
    if (!this.el) return false

    return this.el.postMessage({ action, value }, '*')
  }
}

export default Messenger
