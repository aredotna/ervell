import browser from 'webextension-polyfill';
import Messenger from 'extension/src/lib/Messenger';
import DataExtractor from 'extension/src/lib/DataExtractor';

class Pane {
  constructor(msg) {
    this.msg = msg;

    this.frame = this.createIframe();
    this.dragTarget = this.createDragTarget();
    this.style = this.addIframeStyle();

    this.setupListeners();
    this.setupReceiver();

    this.messenger = new Messenger(this.frame.contentWindow);
  }

  createIframe = () => {
    const iframe = document.createElement('iframe');

    iframe.src = browser.extension.getURL('iframe.html');
    iframe.id = 'arenaExtension_frame';
    iframe.name = iframe.id;

    document.body.appendChild(iframe);

    return iframe;
  }

  createDragTarget = () => {
    const targetDiv = document.createElement('div');
    targetDiv.id = 'arenaExtension_div';

    const message = document.createElement('h1');
    message.innerHTML = ('Drag and drop text and/or images here.');

    targetDiv.appendChild(message);
    document.body.appendChild(targetDiv);

    return targetDiv;
  }

  addIframeStyle = () => {
    const url = browser.extension.getURL('iframe.css');
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;

    document.body.appendChild(link);
    return link;
  }

  onStartDrag = (e) => {
    this.messenger.send({
      action: 'drag',
    });

    e.dataTransfer.effectAllowed = 'copyMove';

    if (typeof e.dataTransfer.getData('text/html') === 'undefined' || e.target.tagName === 'IMG') {
      const targetParent = document.createElement('A');

      const parentHTML = targetParent.cloneNode(false);
      const targetImage = e.target.cloneNode(false);

      parentHTML.appendChild(targetImage);
      e.dataTransfer.setData('text/html', parentHTML.outerHTML);
    }

    // Show the drop target
    this.dragTarget.style.display = 'flex';
    this.dragTarget.style.opacity = 1;

    // Hide the underlying iframe
    this.frame.style.display = 'none';
  }

  onStopDrag = () => {
    // Show the drop target
    this.dragTarget.style.display = 'none';
    this.dragTarget.style.opacity = 0;

    // Hide the underlying iframe
    this.frame.style.display = 'block';
  }

  onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    return false;
  }

  onDragEnter = (e) => {
    e.dataTransfer.dropEffect = 'copy';

    this.messenger.send({
      action: 'dragenter',
    });
  }

  onDragLeave = () => {
    this.messenger.send({
      action: 'dragleave',
    });
  }

  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = new DataExtractor(e).extract();

    this.messenger.send({
      action: 'drop',
      value: data,
    });

    return false;
  }

  setupListeners = () => {
    document.addEventListener('dragstart', this.onStartDrag, true);
    document.addEventListener('dragend', this.onStopDrag, true);

    this.dragTarget.addEventListener('dragover', this.onDragOver, true);
    this.dragTarget.addEventListener('dragenter', this.onDragEnter, false);
    this.dragTarget.addEventListener('dragleave', this.onDragLeave, false);
    this.dragTarget.addEventListener('drop', this.onDrop, false);
  }

  setupReceiver = () => {
    window.addEventListener('message', this.receiveMessage);
  }

  receiveMessage = (msg) => {
    switch (msg.data.action) {
      case 'close':
        this.closePane();
        break;
      // case 'expand':
      //   el = document.getElementById('arena_frame');
      //   addClass(el, 'is-expanded');
      //   break;
      // case 'contract':
      //   el = document.getElementById('arena_frame');
      //   removeClass(el, 'is-expanded');
      //   break;
      default:
        break;
    }
  }

  closePane = () => {
    if (this.frame) document.body.removeChild(this.frame);
    if (this.dragTarget) document.body.removeChild(this.dragTarget);
    if (this.style) document.body.removeChild(this.style);
  }
}

export default Pane;
