document.addEventListener('contextmenu', handleContextMenu, false)

function handleContextMenu(event) {
  var selectedText = window.getSelection().toString()
  var url = window.parent.location.href
  var target = event.target

  var data = {
    id: Math.floor(Math.random() * 1000000) + 1,
  }

  const sourceData = {
    original_source_url: url,
    original_source_title: window.parent.document.title,
  }

  var extraData = {}

  while (
    target != null &&
    target.nodeType == Node.ELEMENT_NODE &&
    target.nodeName.toLowerCase() != 'a'
  ) {
    target = target.parentNode
  }

  // If the target is a link, save the link
  if (target.nodeName === 'A') {
    extraData = {
      type: 'Link',
      value: target.href,
    }

    // Is it an image?
  } else if (event.target.nodeName === 'IMG') {
    extraData = {
      type: 'Image',
      value: event.target.src,
    }

    // Is it selected text?
  } else if (selectedText !== '') {
    extraData = {
      type: 'Text',
      value: selectedText,
    }

    // If none of those things, just save the page.
  } else if (selectedText === '') {
    extraData = {
      type: 'Link',
      value: url,
    }
  }

  var messageData =
    extraData.type === 'Link'
      ? { ...data, ...extraData }
      : { ...data, ...extraData, ...sourceData }

  safari.extension.setContextMenuEventUserInfo(event, messageData)
}
