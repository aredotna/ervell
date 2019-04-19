import uuidv4 from 'uuid/v4';

class DataExtractor {
  constructor(event) {
    this.event = event;
    this.data = { id: uuidv4() };

    this.setSourceData();
  }

  extract = () => {
    const tempData = {};

    // make the temp data object a little nicer to deal with
    if (this.event.dataTransfer.types != null) {
      for (let i = 0; i < this.event.dataTransfer.types.length; i += 1) {
        const type = this.event.dataTransfer.types[i];
        tempData[type] = this.event.dataTransfer.getData(type);
      }
    }

    console.log(tempData);

    // If we have html, try to find an image within
    if (tempData['text/html'] && this.extractImageFromHTML(tempData)) {
      this.data = {
        ...this.data,
        type: 'Image',
        value: this.image,
      };
    } else if (tempData['text/uri-list']) {
      // we have a link probably
      this.data = {
        ...this.data,
        type: 'Link',
        value: tempData['text/uri-list'],
      };
    } else {
      // otherwise we are dealing with text
      this.data = {
        ...this.data,
        type: 'Text',
        value: tempData['text/plain'],
      };
    }

    return this.data;
  }

  extractSelection = (msg) => {
    if (msg.options.selectionText) {
      this.data = {
        ...this.data,
        type: 'Text',
        value: msg.options.selectionText,
      };
    } else if (msg.options.mediaType === 'image') {
      this.data = {
        ...this.data,
        type: 'Image',
        value: msg.options.srcUrl,
      };
    }

    return this.data;
  }

  extractImageFromHTML = (data) => {
    const html = new DOMParser().parseFromString(data['text/html'], 'text/html').body.firstChild;
    this.image = html.querySelector('img') && html.querySelector('img').src;
    return this.image;
  }

  setSourceData = () => {
    this.data = {
      ...this.data,
      originalSourceUrl: window.location.href,
      originalSourceTitle: document.title,
    };
  }
}

export default DataExtractor;
