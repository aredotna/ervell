import Pane from 'lib/Pane'
import markletCSS from 'extension/src/iframe.css'

const SAVE_URL = 'http://localhost:5000/save'

class BookmarkletPane extends Pane {
  addIframeStyle = () => {
    markletStyle = document.createElement('style')
    markletStyle.type = 'text/css'

    markletStyle.appendChild(document.createTextNode(markletCSS))
    document.body.appendChild(markletStyle)

    return markletStyle
  }

  getURL = () => {
    const data = new PaneDataExtractor().extractSelection(this.msg)
    const params = stringify(data, { arrayFormat: 'brackets', encode: false })

    return `${SAVE_URL}?${params};`
  }
}

const pane = new BookmarkletPane()

pane.open({
  url: window.location.href,
  title: window.document.title,
})
