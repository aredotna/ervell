const browser = require('webextension-polyfill')

browser.contextMenus.create({
  title: 'Add to Are.na',
  contexts: [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio',
  ],
  onclick(options, tab) {
    browser.tabs.sendMessage(tab.id, {
      text: 'add',
      options,
      title: tab.title,
      url: tab.url,
      tab_id: tab.id,
      tab,
    })
  },
})

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, {
    text: 'toggle',
    options: { srcUrl: tab.url },
    title: tab.title,
    url: tab.url,
    tab_id: tab.id,
  })
})

if (browser.commands) {
  browser.commands.onCommand.addListener(command => {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        text: command,
        title: tabs[0].title,
        options: { srcUrl: tabs[0].url },
        url: tabs[0].url,
        tab_id: tabs[0].id,
      })
    })
  })
}

browser.runtime.onInstalled.addListener(object => {
  if (object.reason === 'install') {
    browser.tabs.create({
      url:
        'http://help.are.na/knowledge_base/topics/how-do-i-use-the-browser-extension',
    })
  }
})
