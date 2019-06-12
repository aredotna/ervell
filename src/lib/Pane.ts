import PaneMessenger from 'lib/PaneMessenger'
import PaneDataExtractor from 'lib/PaneDataExtractor'

class Pane {
  public isOpen
  public frame
  public msg
  public dragTarget
  public style
  public messenger

  open = msg => {
    this.isOpen = true

    if (this.frame) {
      return this.showIframe()
    }

    return this.initialize(msg)
  }

  add = msg => {
    this.isOpen = true

    if (this.frame) {
      this.showIframe()
      return this.sendData(msg)
    }
    return this.initialize(msg)
  }

  initialize(msg) {
    this.msg = msg

    // All the things that will hold this component
    this.frame = this.createIframe()
    this.dragTarget = this.createDragTarget()
    this.style = this.addIframeStyle()

    // Listen to drag and drop events on the browser window
    this.setupEventListeners()

    // So we can communicate with the iframe
    this.setupReceiver()
    this.messenger = new PaneMessenger(this.frame.contentWindow)
  }

  close = () => {
    this.isOpen = false
    this.hideIframe()
  }

  createIframe = () => {
    const iframe = document.createElement('iframe')

    iframe.src = this.getURL()
    iframe.id = 'arenaExtension_frame'
    iframe.name = iframe.id

    document.body.appendChild(iframe)

    return iframe
  }

  showIframe = () => {
    this.frame.style.display = 'block'
  }

  hideIframe = () => {
    this.frame.style.display = 'none'
  }

  createDragTarget = () => {
    const targetDiv = document.createElement('div')
    targetDiv.id = 'arenaExtension_div'

    const message = document.createElement('h1')
    message.innerHTML = 'Drag here to add to Are.na'

    targetDiv.appendChild(message)
    document.body.appendChild(targetDiv)

    return targetDiv
  }

  addIframeStyle = () => {
    const link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'

    document.body.appendChild(link)
    return link
  }

  getURL = () => {
    return '/'
  }

  onStartDrag = e => {
    this.messenger.send({
      action: 'drag',
    })

    e.dataTransfer.effectAllowed = 'copyMove'

    if (
      typeof e.dataTransfer.getData('text/html') === 'undefined' ||
      e.target.tagName === 'IMG'
    ) {
      const targetParent = document.createElement('A')

      const parentHTML = targetParent.cloneNode(false)
      const targetImage = e.target.cloneNode(false)

      parentHTML.appendChild(targetImage)
      e.dataTransfer.setData('text/html', (<Element>parentHTML).outerHTML)
    }

    // Show the drop target
    this.dragTarget.style.display = 'flex'
    this.dragTarget.style.opacity = 1

    // Hide the underlying iframe
    this.hideIframe()
  }

  onStopDrag = () => {
    // Hide the drop target
    this.dragTarget.style.display = 'none'
    this.dragTarget.style.opacity = 0

    // Show the underlying iframe
    this.showIframe()
  }

  onDragOver = e => {
    e.stopPropagation()
    e.preventDefault()

    return false
  }

  onDragEnter = e => {
    e.dataTransfer.dropEffect = 'copy'

    this.messenger.send({
      action: 'dragenter',
    })
  }

  onDragLeave = () => {
    this.messenger.send({
      action: 'dragleave',
    })
  }

  onDrop = e => {
    e.stopPropagation()
    e.preventDefault()

    const data = new PaneDataExtractor(e).extract()

    this.messenger.send({
      action: 'drop',
      value: data,
    })

    return false
  }

  setupEventListeners = () => {
    document.addEventListener('dragstart', this.onStartDrag, true)
    document.addEventListener('dragend', this.onStopDrag, true)

    this.dragTarget.addEventListener('dragover', this.onDragOver, true)
    this.dragTarget.addEventListener('dragenter', this.onDragEnter, false)
    this.dragTarget.addEventListener('dragleave', this.onDragLeave, false)
    this.dragTarget.addEventListener('drop', this.onDrop, false)
  }

  removeEventListeners = () => {
    document.removeEventListener('dragstart', this.onStartDrag, true)
    document.removeEventListener('dragend', this.onStopDrag, true)

    this.dragTarget.removeEventListener('dragover', this.onDragOver, true)
    this.dragTarget.removeEventListener('dragenter', this.onDragEnter, false)
    this.dragTarget.removeEventListener('dragleave', this.onDragLeave, false)
    this.dragTarget.removeEventListener('drop', this.onDrop, false)
  }

  setupReceiver = () => {
    window.addEventListener('message', this.receiveMessage)
  }

  receiveMessage = msg => {
    switch (msg.data.action) {
      case 'getCurrentPage':
        this.sendCurrentPage()
        break
      case 'getInitialBlock':
        this.sendInitialData()
        break
      case 'close':
        this.destroyPane()
        break
      case 'expand':
        this.expandPane()
        break
      case 'contract':
        this.contractPane()
        break
      default:
        break
    }
  }

  sendCurrentPage = () => {
    let { data } = new PaneDataExtractor()

    data = {
      ...data,
      type: 'Link',
      value: window.location.href,
      url: window.location.href,
      title: document.title,
    }

    this.messenger.send({
      action: 'currentPage',
      value: data,
    })
  }

  saveCurrentPage = () => {
    this.messenger.send({
      action: 'saveCurrentPage',
    })
  }

  sendInitialData = () => {
    this.sendData(this.msg)
  }

  sendData = msg => {
    const data = new PaneDataExtractor().extractSelection(msg)

    if (data.type) {
      this.messenger.send({
        action: 'drop',
        value: data,
      })
    }
  }

  expandPane = () => {
    const element = document.getElementById('arenaExtension_frame')
    element.classList.add('is-expanded')

    const target = document.getElementById('arenaExtension_div')
    target.classList.add('is-expanded')
  }

  contractPane = () => {
    const element = document.getElementById('arenaExtension_frame')
    element.classList.remove('is-expanded')

    const target = document.getElementById('arenaExtension_div')
    target.classList.remove('is-expanded')
  }

  destroyPane = () => {
    this.isOpen = false
    this.removeEventListeners()

    if (this.frame) document.body.removeChild(this.frame)
    if (this.dragTarget) document.body.removeChild(this.dragTarget)
    if (this.style) document.body.removeChild(this.style)

    this.frame = null
    this.dragTarget = null
    this.style = null
  }
}

export default Pane
