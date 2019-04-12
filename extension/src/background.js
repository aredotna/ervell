const browser = require('webextension-polyfill');

browser.contextMenus.create({
  title: 'Add to Are.na',
  contexts: ['page', 'selection', 'link', 'editable', 'image', 'video', 'audio'],
  onclick(options) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        text: 'open:dialog',
        options,
        title: tabs[0].title,
        url: tabs[0].url,
        tab_id: tabs[0].id,
      });
    });
  },
});

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, {
    text: 'open:dialog',
    options: { srcUrl: tab.url },
    title: tab.title,
    url: tab.url,
    tab_id: tab.id,
  });
});
