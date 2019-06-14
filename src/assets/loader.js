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

  getURL = () => {
    const { data } = new PaneDataExtractor(this.msg)
    const params = stringify(data, { arrayFormat: 'brackets', encode: false })
    const url = encodeURIComponent(data.original_source_url)

    return `${SAVE_URL}/${url}?${params};`
  }
}

const pane = new BookmarkletPane()

pane.open({
  url: window.location.href,
  title: window.document.title,
})
