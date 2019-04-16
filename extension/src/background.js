const browser = require('webextension-polyfill');

browser.contextMenus.create({
  title: 'Add to Are.na',
  contexts: ['page', 'selection', 'link', 'editable', 'image', 'video', 'audio'],
  onclick(options, tab) {
    browser.tabs.sendMessage(tab.id, {
      text: 'open:dialog',
      options,
      title: tab.title,
      url: tab.url,
      tab_id: tab.id,
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
