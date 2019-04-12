class DataExtractor {
  constructor(event) {
    this.event = event;
    this.data = {};

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

    // If we have html, try to find an image within
    if (tempData['text/html']) {
      const image = this.extractImageFromHTML(tempData);

      this.data = {
        ...this.data,
        type: 'Image',
        value: image,
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

  extractImageFromHTML = (data) => {
    const html = new DOMParser().parseFromString(data['text/html'], 'text/html').body.firstChild;

    console.log('html', html);

    // find image within html;
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
