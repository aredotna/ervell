export const handleContextMenu = event => {
  console.log('handleContextMenu')
  var sel = window.parent.getSelection().toString()
  var url = window.parent.location.href

  console.log('SELECTION', sel)

  var target = event.target

  let pageInfo

  while (
    target != null &&
    target.nodeType == Node.ELEMENT_NODE &&
    target.nodeName.toLowerCase() != 'a'
  ) {
    target = target.parentNode
  }

  //clicks on link - send url
  if (target.nodeName === 'A') {
    pageInfo = {
      name: target.nodeName,
      href: target.href,
    }
    sel = ''
  }
  //clicks on image - send url image
  else if (event.target.nodeName === 'IMG') {
    pageInfo = {
      name: event.target.nodeName,
      src: event.target.src,
      url,
    }
    sel = ''
  }
  //selection text and click - send selection text
  else if (sel != '') {
    pageInfo = {
      url,
      selection: sel,
    }
    sel = ''
  }
  //clicks on empty space - send current page url
  else if (sel == '') {
    pageInfo = {
      url,
    }

    sel = ''
  }

  console.log('sel', sel, 'userINfor', pageInfo)
  localStorage.setItem('initialBlock', JSON.stringify(pageInfo))
}
