Backbone = require 'backbone'
Browser = require 'zombie'
rewire = require 'rewire'
app = require '../example'
sinon = require 'sinon'
{ ARENA_EMAIL, ARENA_PASSWORD } = require '../config'

describe 'Arena Passport integration', ->

  before (done) ->
    app.listen 5000, done

  it 'can log in with email and password', (done) ->
    Browser.visit 'http://localhost:4000', (e, browser) ->
      browser
        .fill('email', ARENA_EMAIL)
        .fill('password', ARENA_PASSWORD)
        .pressButton "Login", ->
          done()

describe 'Arena Passport methods', ->

  before ->
    @arenaPassport = rewire '../index.coffee'

  describe '#serializeUser', ->

    before ->
      @serializeUser = @arenaPassport.__get__ 'serializeUser'

    it 'only stores select data in the session', (done) ->
      model = new Backbone.Model({ id: 'craig', foo: 'baz', bam: 'bop' })
      model.fetch = (opts) -> opts.success()
      @serializeUser model, (err, user) ->
        (user.foo?).should.not.be.ok
        (user.bam?).should.not.be.ok
        done()

  describe '#afterLocalAuth', ->

    beforeEach ->
      opts = @arenaPassport.__get__ 'opts'
      @afterLocalAuth = @arenaPassport.__get__ 'afterLocalAuth'
      @req = { query: {}, user: { get: -> 'access-foo-token' } }
      @res = { send: sinon.stub(), body: {nothing: 'something', toJSON: -> }}
      @next = sinon.stub()

    it 'throws a 403 if there is an auth error', ->
      @res.authError = 'foobar'
      @afterLocalAuth @req, @res
      @res.send.args[0][0].should.equal 403

    it 'returns json success for ajax calls', ->
      @req.xhr = true
      @req.accepts = -> true
      @req.user = { toJSON: -> }
      @afterLocalAuth @req, @res
      @res.send.args[0][0].success.should.be.ok

  describe '#headerLogin', ->

    beforeEach ->
      opts = @arenaPassport.__get__ 'opts'
      opts.CurrentUser = Backbone.Model
      @headerLogin = @arenaPassport.__get__ 'headerLogin'
      @req = { query: {}, get: (-> 'access-foo-token'), login: sinon.stub() }
      @res = { send: sinon.stub() }
      @next = sinon.stub()

    it 'logs in a user if they pass their access token as a header', ->
      @headerLogin @req, @res, @next
      @req.login.args[0][0].get('accessToken').should.equal 'access-foo-token'