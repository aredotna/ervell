import browser from 'webextension-polyfill'
import ExtensionPane from 'extension/src/lib/ExtensionPane'

const pane = new ExtensionPane()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let clickedData = null

document.addEventListener(
  'contextmenu',
  function(event) {
    clickedData = {
      el: event.target,
      x: event.clientX,
      y: event.clientY,
    }
  },
  true
)

browser.runtime.onMessage.addListener(msg => {
  switch (msg.text) {
    case 'toggle':
      if (pane.isOpen) {
        return pane.close()
      }
      return pane.open(msg)
    case 'add':
      return pane.open({ ...msg, clickedData })
    case 'save-page':
      if (pane.isOpen) {
        return pane.saveCurrentPage()
      }
      return pane.open(msg)
    default:
      break
  }

  return null
})
