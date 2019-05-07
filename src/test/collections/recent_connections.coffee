benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

clock = null
RecentConnections = null

xdescribe 'RecentConnections', ->
  before (done) ->
    clock = sinon.useFakeTimers()

    benv.setup ->
      # Stub local storage
      local = {}
      storage = getItem: (key) -> local[key]
      benv.expose localStorage: storage
      RecentConnections = require '../../collections/recent_connections'
      done()

  after ->
    clock.restore()
    benv.teardown()

  describe '#shove, #append', ->
    it 'adds the model to the top of the stack, or takes the existing one and moves it to the front', ->
      a = new Backbone.Model id: 'a'
      b = new Backbone.Model id: 'b'
      c = new Backbone.Model id: 'c'
      d = new Backbone.Model id: 'd'
      e = new Backbone.Model id: 'e'
      z = new Backbone.Model id: 'z'

      xs = new RecentConnections

      xs.shove a
      clock.tick 1
      xs.shove b
      clock.tick 1
      xs.shove c
      clock.tick 1

      xs.map((x) -> x.id).should.eql ['c', 'b', 'a']

      xs.shove d
      clock.tick 1
      xs.shove a
      clock.tick 1

      xs.map((x) -> x.id).should.eql ['a', 'd', 'c', 'b']

      xs.shove c
      clock.tick 1

      xs.map((x) -> x.id).should.eql ['c', 'a', 'd', 'b']

      xs.append z
      clock.tick 1
      xs.shove e
      clock.tick 1

      xs.map((x) -> x.id).should.eql ['e', 'c', 'a', 'd', 'b', 'z']
