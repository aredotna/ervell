import browser from 'webextension-polyfill';
import Pane from 'extension/src/lib/Pane';

browser.runtime.onMessage.addListener((msg) => {
  if (msg.text && (msg.text === 'open:dialog')) {
    const pane = new Pane(msg);
    return pane;
  }
  return null;
});
