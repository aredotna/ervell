{ resolve } = require 'path'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

Block = require '../../../../models/block'
Channels = require '../../../../collections/connection_blocks'
mediator = require '../../../../lib/mediator'

ConnectView = benv.requireWithJadeify resolve(__dirname, '../../client/view'), []
ConnectResultsView = benv.requireWithJadeify resolve(__dirname, '../../components/results/view'), []
ConnectItemView = benv.requireWithJadeify resolve(__dirname, '../../components/item/view'), ['template']

ConnectResultsView.__set__ 'ConnectItemView', ConnectItemView
ConnectView.__set__ 'ConnectResultsView', ConnectResultsView

describe 'ConnectView', ->
  before (done) ->
    mediator.shared = {}
    mediator.shared.recent_connections = new Backbone.Collection
    mediator.shared.recent_connections.shove = Backbone.Collection::add
    mediator.shared.recent_connections.unshove = Backbone.Collection::remove

    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new ConnectView
      model: new Block id: 'block1'
      collection: new Channels [
        { id: 'channel1', title: 'title1', slug: 'slug1', status: 'private', user: slug: 'user1' }
      ], user_slug: 'lol'

  it 'renders the view heirarchy', ->
    html = @view.render().$el.html()
    html.should.containEql '<a href="/user1/slug1">'
    html.should.containEql '<span class="Color--private">title1</span>'

  describe 'when clicked', ->
    beforeEach ->
      @view.render()
      sinon.stub ConnectItemView.__get__('AsyncSerialQueue')::, 'enqueue', (fn) -> fn()
      sinon.stub $, 'ajax'

    afterEach ->
      $.ajax.restore()
      ConnectItemView.__get__('AsyncSerialQueue')::enqueue.restore()

    it 'connects', ->
      @view.$('.Connect__item').click()
      $.ajax.callCount.should.equal 1
      $.ajax.args[0][0].type.should.eql 'POST'
      $.ajax.args[0][0].url.should.containEql '/channels/channel1/connections'
