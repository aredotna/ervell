var blessed = require('blessed')

var col_width = 100/3

module.exports = function(items) {

  // Create a screen object.
  var screen = blessed.screen({
    smartCSR: true,
    autoPadding: true
    // log: __dirname + '/logs/scrollable-boxes.log'
  })

  // Create a box perfectly centered horizontally and vertically.
  var logs = blessed.box({
    parent: screen,
    scrollable: true,
    label: ' Logs ',
    width:  col_width*2 + '%',
    height: '98%',
    left: 0,
    top: 0,
    border: {
      type: 'ascii'
    },
    keys: true,
    vi: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      bg: 'blue'
    },
    style: {
      focus: {
        border: {
          fg: 'blue'
        }
      }
    }
  })

  var content = blessed.box({
    parent: logs,
    content: '',
    padding: 2,
     width: '98%',
     height: '100%',
     left: -2
  })

  // content.setIndex(5)

  var sidebar = blessed.list({
    parent: screen,
    width: col_width+'%',
    height: '65%',
    right: 0,
    label : ' PM2 Process list ',
    style: {
      fg: 'red',
      focus: {
        border: {
          fg: 'blue'
        }
      },
      item: {
        // hover: {
        //   bg: 'blue'
        // },
      },
      selected: {
        bold: true,
        inverse: true
      }
    },
    border: {
      type: 'line'
    },
    // mouse: true,
    keys: true,
    vi: true,
    items: items
  })

  var errors = blessed.box({
    parent: screen,
    content: '',
    scrollable: true,
    keys: true,
    label: ' PM2 infos ',
    vi: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      bg: 'blue'
    },
    padding: 1,
    style: {
      fg: 'white',
      focus: {
        border: {
          fg: 'red',
        }
      }
    },
    border: {
     type: 'line'
    },
    width: col_width+'%',
    height: '31%',
    right: 0,
    top: '65%',
  })

  var helper = blessed.box({
    parent: screen,
    content: ' q: quit | right-left: change focus | up-down: scroll | p: pause/play logs',
    height: 3,
    width: '100%',
    left: 0,
    bottom: 0,
    border: {
      type: 'line'
    },
  })

  // Focus our element.
  sidebar.focus()

  // Render the screen.
  screen.render()

  return {
    sidebar: sidebar,
    content: content,
    logs: logs,
    errors: errors,
    screen: screen,
  }
}
