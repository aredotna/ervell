import browser from 'webextension-polyfill'
import { stringify } from 'qs'

import Pane from 'lib/Pane'
import PaneDataExtractor from 'lib/PaneDataExtractor'

class ExtensionPane extends Pane {
  addIframeStyle = () => {
    const url = browser.extension.getURL('iframe.css')
    const link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url

    document.body.appendChild(link)
    return link
  }

  getURL = () => {
    const data = new PaneDataExtractor().extractSelection(this.msg)
    const params = stringify(data, { arrayFormat: 'brackets', encode: false })

    const baseURL = browser.extension.getURL('/index.html')
    return `${baseURL}?${params};`
  }
}

export default ExtensionPane
