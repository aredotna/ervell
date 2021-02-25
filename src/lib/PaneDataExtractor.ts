class PaneDataExtractor {
  public event
  public data
  public image

  constructor(event?) {
    this.event = event
    this.data = { id: Math.floor(Math.random() * 1000000) + 1 }

    this.setSourceData()
  }

  extract = () => {
    const tempData = {}

    // make the temp data object a little nicer to deal with
    if (this.event.dataTransfer.types != null) {
      for (let i = 0; i < this.event.dataTransfer.types.length; i += 1) {
        const type = this.event.dataTransfer.types[i]
        tempData[type] = this.event.dataTransfer.getData(type)
      }
    }

    // If we have html, try to find an image within
    if (tempData['text/html'] && this.extractImageFromHTML(tempData)) {
      this.data = {
        ...this.data,
        type: 'Image',
        value: this.image,
      }
    } else if (tempData['text/uri-list']) {
      // we have a link, don't copy the original source
      this.data = {
        id: this.data.id,
        type: 'Link',
        value: tempData['text/uri-list'],
      }
    } else {
      // otherwise we are dealing with text
      this.data = {
        ...this.data,
        type: 'Text',
        value: tempData['text/plain'],
      }
    }

    return this.data
  }

  extractSelection = msg => {
    // If we have some text, send that,
    // otherwise find an image if we can.
    // Failing all else, save the page.

    if (msg.options.selectionText) {
      this.data = {
        ...this.data,
        type: 'Text',
        value: msg.options.selectionText,
      }
    } else if (msg.options.mediaType === 'image') {
      this.data = {
        ...this.data,
        type: 'Image',
        value: msg.options.srcUrl,
      }
    } else if (msg.clickedData) {
      // Last ditch effort, let's see if we can find an image in here
      const urls = this.extractImageFromMouseCoords(
        msg.clickedData.x,
        msg.clickedData.y
      )

      this.data =
        urls.length > 0
          ? {
              ...this.data,
              type: 'Image',
              value: urls[0].src,
            }
          : this.data
    }

    return this.data
  }

  // This looks for an HTML element that is either an actual image or
  // something with a background image in the general vicinity of where the
  // person right-clicked
  //
  // It does this by finding an element at the coordinates,
  // checking it, and then moving on to the next one by marking the previous
  // one with pointer-events: none
  extractImageFromMouseCoords = (x: number, y: number) => {
    if (isNaN(x) || isNaN(y)) return null

    let stack = []
    let allStack = []
    let elementMouseIsOver = document.elementFromPoint(
      Math.max(x, 0),
      Math.max(y, 0)
    ) as HTMLElement

    let checkEl = el => {
      return (
        el &&
        (el.tagName == 'IMG' ||
          window.getComputedStyle(el).backgroundImage != 'none')
      )
    }

    if (elementMouseIsOver.tagName == 'A') {
      Array.from(elementMouseIsOver.querySelectorAll('*')).forEach(el => {
        if (checkEl(el)) {
          stack.push(el)
        }
      })
    }

    while (elementMouseIsOver.tagName !== 'HTML') {
      if (checkEl(elementMouseIsOver)) {
        stack.push(elementMouseIsOver)
      }

      elementMouseIsOver.style['pointer-events'] = 'none'
      let tmp = elementMouseIsOver
      elementMouseIsOver = document.elementFromPoint(x, y) as HTMLElement

      if (tmp == elementMouseIsOver) {
        break
      }

      allStack.push(elementMouseIsOver)
    }

    stack.forEach(item => {
      item.style['pointer-events'] = 'auto'
    })
    allStack.forEach(item => {
      item.style['pointer-events'] = 'auto'
    })

    return stack
  }

  extractImageFromHTML = data => {
    const html = new DOMParser().parseFromString(data['text/html'], 'text/html')
      .body.firstChild

    console.log({ html })

    this.image =
      (<Element>html).querySelector('img') &&
      (<Element>html).querySelector('img').src
    return this.image
  }

  setSourceData = () => {
    this.data = {
      ...this.data,
      original_source_url: window.location.href,
      original_source_title: document.title,
    }
  }
}

export default PaneDataExtractor
