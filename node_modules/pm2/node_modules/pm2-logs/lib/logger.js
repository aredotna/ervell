var ipm2 = require('pm2-interface')()
  , chalk = require('chalk')
  , pretty = require('./pretty')

var EOL = require('os').EOL

var logger = {
  started: false,
  paused: false,
  processes: {}, //used to store processes (see add/remove methods)
  watching: '', //used to store current watching item name
  isAlive: false,
  focus: [
    {title: 'logs', enabled: false, index: 0, autoScroll: true},
    {title: 'sidebar', enabled: true, index: 1, autoScroll: true},
    {title: 'errors', enabled: false, index: 2, autoScroll: true},
  ],
  //return something like "#0 (err) MyProcess"
  label: function(id, name) {
    return '#'+ id + ' ' + name
  },
  //Returns items to be watched
  getItems: function() {
    var items = []

    for(var i in this.processes) {
      items.push(this.processes[i].item)
    }

    return items
  },
  /**
   * Adds a process to processes list
   * @param {Object} env pm2_env
   */
  add: function(env) {

    var color = pretty.getColor()

    this.processes[env.pm_id] = {
      out: env.pm_out_log_path,
      err: env.pm_err_log_path,
      name: env.name,
      item: chalk[color](this.label(env.pm_id, env.name)),
      id: env.pm_id,
      lines: []
    }

    var items = this.getItems()

    if(!this.started) {
      return this;
    }

    if(items.length === 1) {
      this.watch(this.processes[env.pm_id].item)
    }

    this.err(
      chalk.bold(this.processes[env.pm_id].item) +
      ' ' + chalk.green(env.status)
    )

    this.reloadSidebar()

    return this
  },
  /**
   * Removes a process from processes list
   * @param  {int} id    pm_id
   */
  remove: function(env) {
    var id = env.pm_id

    //...
    if(!this.processes[id]) {
      return this;
    }

    //logging process status
    this.err(
      chalk.bold(this.processes[id].item) +
      ' ' + chalk.red(env.status)
    )

    var items = this.getItems(), update = false

    if(pretty.stripAnsi(this.processes[id].item) == this.watching) {
      update = true
    }

    delete this.processes[id]

    items = this.getItems()

    if(items.length > 0 && this.started) {

      if(update === true ) {
        this.watch(items[0])
      }

      this.reloadSidebar()
    }

    return this
  },
  /**
   * used to watch a new process for logs
   * @param id
   * @param env
   * @param label

   * @return initContent
   */
  watch: function(label) {

    var l = pretty.stripAnsi(label)
      , m = l.match(/^#(\d{1,})/)

    if(!m) {
      throw new Error('Something went wrong while parsing label: ' + label)
    }
    var id = m[1]

    label = this.processes[id].item

    return this.initContent({ label: label, content: this.processes[id].lines.join(EOL)})
  },
  /**
   * init Logger content (this.i.logs)
   * @param  {Object} opts  {content, label}
   */
  initContent: function(opts) {
    opts.content = opts.content && opts.content.length > 0 ? opts.content : ''

    this.i.logs.setLabel(opts.label)

    this.i.content.setContent('Starting logs for: ' + opts.label + '\n\n' + opts.content) //reset

    //small first launch hack
    if(opts.content === '') {
      this.i.content.insertBottom('\n\n')
    }

    //pretty.format = ?
    this.i.screen.render()

    this.i.content.height = this.i.content._clines > 0 ? this.i.content._clines : 10;
    this.i.logs.resetScroll()

    this.i.screen.render()

    this.watching = pretty.stripAnsi(opts.label)

    return this
  },
  /**
   * Basic error logger
   * @param  {String} data
   */
  err: function(data) {

    this.i.errors.insertBottom(pretty.data(data, null, true))

    if(this.hasAutoscroll('errors')) {
      this.i.errors.scroll(this.i.errors._clines.length)
    }
    this.i.screen.render()

    return this
  },
  /**
   * Basic log
   * @param  {Mixed} data
   */
  log: function(data) {

    if(this.paused === false) {

      this.i.content.insertBottom(data)
      this.i.content.height = this.i.content._clines.length

      if(this.hasAutoscroll('logs')) {

        //increasing height according to num content lines

        var height = this.i.content.height - this.i.content.iheight
        if (this.i.content._clines.length > height) {
          this.i.logs.scroll(this.i.content._clines.length)
        }

      }

      this.i.screen.render()
    }

    return this
  },

  /**
   * initInterface inits interface listeners
   * @param  {Object} ipm2 pm2-interface
   */
  initInterface: function() {
    var self = this


    this.i.sidebar.on('keypress', function(t, k) {
      if(k.name == 'up' || k.name == 'down') {
        self.i.sidebar.enterSelected()
      }
    })

    this.i.sidebar.on('select', function(item) {
      self.watch(item.content)
    })

    // Quit on Escape, q, (or Control-C => 'C-c' => buggy)
    this.i.screen.key(['escape', 'q'], function(ch, key) {
      ipm2.disconnect()
      return process.exit(0)
    })

    this.i.screen.key(['p'], function(ch, key) {

      if(self.paused === true) {
        self.err(chalk.cyan('Play'))
        self.watch(self.watching)
      } else {
        self.err(chalk.cyan('Paused'))
      }

      self.paused = !self.paused

    })

    this.i.screen.on('keypress', function(t, k) {
      if(self.focus[0].enabled === true) {
        if(k.name == 'pagedown' || k.name == 'pageup') {
          var range = k.name == 'pagedown' ? 75 : -75
          self.i.logs.scroll(range)
          self.i.screen.render()
        }
      }
    })

    this.i.screen.key(['left', 'right'], function(ch, key) {
      var col = self.getCol(key.name)
      self.focus[col.index].enabled = true
      self.i[col.title].focus()
    })

    this.i.logs.on('focus', function() {
      self.toggleAutoscroll(['errors'])
    })

    this.i.sidebar.on('focus', function() {
      self.toggleAutoscroll(['logs', 'errors'])

    })

    this.i.errors.on('focus', function() {
      self.toggleAutoscroll(['logs'])
    })


    return this
  },
  hasAutoscroll: function(title) {

    for(var i in this.focus) {
      if(this.focus[i].title == title) {
        return this.focus[i].autoScroll
      }
    }
  },
  toggleAutoscroll: function(has, title) {

    var self = this, i

    for(i in self.focus) {
      self.focus[i].autoScroll = false
    }

    for(i in self.focus) {
      for(var j in has) {
        if(self.focus[i].title == has[j]) {
          self.focus[i].autoScroll = true
        }
      }
    }

  },
  /**
   * Get next|prev col according to direction
   * @param  {String} dir left|right
   * @return {Object}     focused item
   */
  getCol: function(dir) {
    var l = this.focus.length, prev, next, f = this.focus

    for(var i = 0; i < l; i++) {
      if(f[i].enabled === true) {
        next = i == l-1 ? 0 : i+1
        prev = i === 0 ? l-1 : i-1
        f[i].enabled = false
        break
      }
    }

    return dir == 'left' ? f[prev] : f[next]
  },
  /**
   * Reload sidebar items
   */
  reloadSidebar: function() {
    var items = this.getItems()

    if(items.length > 0) {
      this.i.sidebar.setItems(items)
    }

    this.i.screen.render()

    return this
  },
  /**
   * initPm2 inits ipm2 listeners
   * @param  {Object} ipm2  pm2-interface
   */
  initPm2: function() {
    var self = this

    ipm2.bus.on('pm2:kill', function(d) {
      self.err(chalk.bold.red('PM2 has been killed'))
      self.processes = {}
      self.reloadSidebar()
    })

    ipm2.bus.on('process:online', function(d) {
      self.add(d.process.pm2_env)
    })

    ipm2.bus.on('process:exit', function(d) {
      self.remove(d.process.pm2_env)
    })

    ipm2.bus.on('log:out', function(d){
      var env = d.process.pm2_env
        , label = self.label(env.pm_id, env.name)
        , data = pretty.data(d.data, 'out')

      if(self.watching == label) {
        self.log(data)
      }

      self.processes[env.pm_id].lines.push(data)

    })

    ipm2.bus.on('log:err', function(d){
      var env = d.process.pm2_env
        , label = self.label(env.pm_id, env.name)
        , data = pretty.data(d.data, 'err')

      if(self.watching == label) {
        self.log(data)
      }

      self.processes[env.pm_id].lines.push(data)

    })

    return this
  },

  /**
   * Init logger
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  init: function(opts, cb) {

    var self = this

    if(typeof opts == 'function') {
      cb = opts
      opts = {}
    }

    if(opts && opts.format) {
      pretty.format = opts.format
    }

    console.log('Waiting for pm2...')

    //get called every time pm2 revive from beeing killed
    ipm2.on('ready', function() {

      ipm2.rpc.getMonitorData({}, function(err, list) {

        if(err) {
          throw new Error(err)
        }

        var l = list.length, id, i = 0

        //adds the items list on ini
        for(i; i < l; i++) {

          if(list[i].pm2_env) {

            //keep first id to watch it
            if(i === 0) {
              id = list[i].pm2_env.pm_id
            }

            self.add(list[i].pm2_env)
          }
        }

        if(self.started === false) {
          self.i = require('./log-interface.js')(self.getItems())
          self.initInterface().initPm2()
        } else {
          self.reloadSidebar()
        }

        //Watch first process
        if(self.watching === '' && self.processes[id]) {
          self.watch(self.processes[id].item)
        }
        // else {
          // self.err(chalk.yellow('No processes'))
        // }

        self.started = true

        return cb ? cb() : false
      })

    })

  }
}


module.exports = logger
