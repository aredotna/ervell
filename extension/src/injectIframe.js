import browser from 'webextension-polyfill';
import Pane from 'extension/src/lib/Pane';

const pane = new Pane();

browser.runtime.onMessage.addListener((msg) => {
  switch (msg.text) {
    case 'toggle':
      if (pane.isOpen) {
        return pane.close();
      }
      return pane.open(msg);
    case 'add':
      return pane.add(msg);
    case 'save-page':
      if (pane.isOpen) {
        return pane.saveCurrentPage();
      }
      return pane.open(msg);
    default:
      break;
  }

  return null;
});
