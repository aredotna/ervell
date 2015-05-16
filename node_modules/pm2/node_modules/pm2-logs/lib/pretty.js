var moment = require('moment')
  , stringify = require('json-stringify-safe')
  , chalk = require('chalk')

var pretty = {
  colors: [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
  ],
  format: 'h:mm:ss', //moment format
  current_color: 0,
  getColor: function() {

    if(this.current_color == this.colors.length - 1) {
      this.current_color = 0
    } else {
      this.current_color++
    }

    return this.colors[this.current_color]
  },
  stripAnsi: function (str) {
    return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}([0-9]{1,2})?)?[m|K]/g, '') : str
  },
  drawLine: function(item) {
    var w = item.width - item.iwidth - 1, arr = []
    for(var i = 0; i < w; i++) {
      arr[i] = '-'
    }

    return arr.join('')
  },
  colorType: function(t) {
    if(t.indexOf('err') !== -1) {
      return chalk.red(t)
    } else {
      return chalk.cyan(t)
    }
  },
  data: function(data, type, notime) {
    if(typeof data !== 'string') {
      data = stringify(data, null, 2)
    } else if(data === undefined) {
      data = ''
    }

    var time = notime ? '' : moment().format(this.format) + ': '

    data = data.replace(/\n|\n\r+/, '')

    if(type) {
      data = '(' + this.colorType(type) + ') ' + time + data
    } else {
      data = time + data
    }

    return data
  }
}

module.exports = pretty
