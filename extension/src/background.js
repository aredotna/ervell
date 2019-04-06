chrome.browserAction.onClicked.addListener((tab) => {
  console.log('hi bros');
  chrome.tabs.sendMessage(tab.id, {
    text: 'open:dialog',
    options: { srcUrl: tab.url },
    title: tab.title,
    url: tab.url,
    tab_id: tab.id,
  });
});
