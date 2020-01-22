import { stringify } from 'qs'

import Pane from 'lib/Pane'
import PaneDataExtractor from 'lib/PaneDataExtractor'
import markletCSS from 'extension/src/iframe.css'

const { NODE_ENV } = process.env

const SAVE_URL =
  NODE_ENV === 'development'
    ? 'http://localhost:5000/save'
    : 'https://www.are.na/save'

class BookmarkletPane extends Pane {
  addIframeStyle = () => {
    const markletStyle = document.createElement('style')
    markletStyle.type = 'text/css'

    markletStyle.appendChild(document.createTextNode(markletCSS))
    document.body.appendChild(markletStyle)

    return markletStyle
  }

  createIframe = () => {
    const iframe = document.createElement('iframe')

    iframe.src = this.getURL()
    iframe.id = 'arenaExtension_frame'
    iframe.name = iframe.id
    iframe.sandbox =
      'allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms'

    document.body.appendChild(iframe)

    return iframe
  }

  getURL = () => {
    const { data } = new PaneDataExtractor(this.msg)
    const params = stringify(data, { arrayFormat: 'brackets', encode: false })
    const url = encodeURIComponent(data.original_source_url)

    return `${SAVE_URL}/${url}?${params}`
  }
}

const pane = new BookmarkletPane()

const openPane = () =>
  pane.open({
    url: window.location.href,
    title: window.document.title,
    options: {},
  })

if (typeof document.hasStorageAccess === 'function') {
  // If this is Safari, we can attempt to establish stoage access
  document.hasStorageAccess().then(hasAccess => {
    if (hasAccess) {
      console.log('hasAccess', hasAccess)
      openPane()
    } else {
      document.requestStorageAccess().then(
        () => {
          console.log('access granted')
          openPane()
        },
        () => {
          console.log('access denied')
        }
      )
    }
  })
} else {
  // Otherwise, just try to open the pane
  console.log('just opening the pane')
  openPane()
}
