// import { stringify } from 'qs'

// import Pane from 'lib/Pane'
// import PaneDataExtractor from 'lib/PaneDataExtractor'
// import markletCSS from 'extension/src/iframe.css'

// const SAVE_URL = 'http://localhost:5000/save'

// class BookmarkletPane extends Pane {
//   addIframeStyle = () => {
//     const markletStyle = document.createElement('style')
//     markletStyle.type = 'text/css'

//     markletStyle.appendChild(document.createTextNode(markletCSS))
//     document.body.appendChild(markletStyle)

//     return markletStyle
//   }

//   getURL = () => {
//     console.log('getUrl')
//     const data = new PaneDataExtractor().extractSelection(this.msg)
//     const params = stringify(data, { arrayFormat: 'brackets', encode: false })

//     return `${SAVE_URL}?${params};`
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  // const pane = new BookmarkletPane()

  console.log('opening')

  // pane.open({
  //   url: window.location.href,
  //   title: window.document.title,
  // })
})
