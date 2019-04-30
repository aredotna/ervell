const browser = require('webextension-polyfill');

browser.contextMenus.create({
  title: 'Add to Are.na',
  contexts: ['page', 'selection', 'link', 'editable', 'image', 'video', 'audio'],
  onclick(options, tab) {
    browser.tabs.sendMessage(tab.id, {
      text: 'add',
      options,
      title: tab.title,
      url: tab.url,
      tab_id: tab.id,
    });
  },
});

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, {
    text: 'toggle',
    options: { srcUrl: tab.url },
    title: tab.title,
    url: tab.url,
    tab_id: tab.id,
  });
});

browser.commands.onCommand.addListener((command) => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      text: command,
      title: tabs[0].title,
      options: { srcUrl: tabs[0].url },
      url: tabs[0].url,
      tab_id: tabs[0].id,
    });
  });
});

browser.commands.getAll().then((commands) => {
  console.log('commands', commands);
});
