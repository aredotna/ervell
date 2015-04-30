/*globals sinon,Backbone */
describe('Handle events', function () {


  beforeEach(function () {
    this.model = new Backbone.Model();
    this.collection = new Backbone.Collection();

    this.model.sync = this.collection.sync =  function (a, b, c) {
      c.success();
      this.trigger('sync');
    };


    this.mPoller = Backbone.Poller.get(this.model, {delay: 16});
    this.cPoller = Backbone.Poller.get(this.collection, {delay: 16});
  });

  afterEach(function () {
    this.model.destroy();
    this.collection.reset();

    delete this.model;
    delete this.collection;

    Backbone.Poller.reset();
  });

  it('Should fire a start event once', function () {
    var counter = 0,
    startSpy = sinon.spy(),
    fetchSpy = sinon.spy(this.collection, 'fetch');

    this.cPoller.on('start', startSpy);
    this.cPoller.on('start', function () { counter += 1; });

    this.cPoller.start();

    waitsFor(function () {
      return startSpy.calledOnce;
    });

    expect(counter).toEqual(1);
    expect(this.cPoller.active()).toBe(true);


    waitsFor(function () {
      return fetchSpy.calledThrice;
    });

    runs(function () {
      expect(counter).toEqual(1);
      expect(this.cPoller.active()).toBe(true);
    });

  });

  it('Should fire a stop event', function () {
    var stopSpy = sinon.spy();
    this.cPoller.on('stop', stopSpy).start().stop();

    waitsFor(function () {
      return stopSpy.calledOnce;
    });

    runs(function () {
      expect(this.cPoller.active()).toBe(false);
    });

  });

  it('Should fire a fetch event before fetchig', function () {
    var pFetchSpy = sinon.spy();
    var mFetchSpy = sinon.spy(this.model, 'fetch');

    this.mPoller.on('fetch', pFetchSpy);
    this.mPoller.start();

    waitsFor(function () {
      return pFetchSpy.callCount === 1;
    });

    runs(function () {
      expect(pFetchSpy.calledBefore(mFetchSpy)).toEqual(true);
    });

  });

  it('Should fire a fetch event before success', function () {
    var fetchSpy = sinon.spy();
    var successSpy = sinon.spy();

    this.mPoller.on('fetch', fetchSpy);
    this.mPoller.on('success', successSpy);
    this.mPoller.start();

    waitsFor(function () {
      return successSpy.callCount === 1;
    });

    runs(function () {
      expect(fetchSpy.calledBefore(successSpy)).toEqual(true);
    });
  });

  it('Should fire a fetch event before error', function () {

    this.model.sync = function (method, model, options) {
      options.error('ERROR');
    };

    var fetchSpy = sinon.spy();
    var errorSpy = sinon.spy();

    this.mPoller.on('fetch', fetchSpy);
    this.mPoller.on('error', errorSpy);
    this.mPoller.start();

    waitsFor(function () {
      return errorSpy.callCount === 1;
    });

    runs(function () {
      expect(fetchSpy.calledBefore(errorSpy)).toEqual(true);
    });
  });

  it('Should fire a success event after each successfull fetch', function () {
    var spy = sinon.spy();

    this.mPoller.on('success', spy);
    this.mPoller.start();

    waitsFor(function () {
      return spy.callCount === 3;
    });

    runs(function () {
      expect(spy.callCount).toEqual(3);
    });

  });

  it('Should pass backbone arguments into success and error callbacks', function () {
    var successSpy = sinon.spy();
    var errorSpy = sinon.spy();

    var model = this.model;
    var dummyResp = { poller : 'is awesome'};
    spyOn(this.model, 'fetch').andCallFake(function (options) {
      options.success(model, dummyResp);
      options.error(model, dummyResp);
    });

    this.mPoller.on('success', successSpy);
    this.mPoller.on('error', errorSpy);
    this.mPoller.start();

    waitsFor(function () {
      return successSpy.callCount === 1;
    });

    runs(function () {
      expect(successSpy.calledWith(this.mPoller.model, dummyResp)).toBe(true);
      expect(errorSpy.calledWith(this.mPoller.model, dummyResp)).toBe(true);
    });
  });

  it('Should fire a complete event when condition is satisfied', function () {
    var bool = true,
    spy = sinon.spy();

    this.mPoller.set({ delay: 16, condition: function () { return bool; } });
    this.mPoller.on('complete', spy);
    this.mPoller.start();

    bool = false;
    waits(50);

    runs(function () {
      expect(this.mPoller.active()).toBe(false);
      expect(spy.calledOnce).toBe(true);
    });

  });

  it('Should fire an error event when fetch fails', function () {

    this.model.sync = function (method, model, options){
      options.error('ERROR');
    };

    var spy = sinon.spy();
    var poller = this.mPoller.on('error', spy);

    poller.start();

    waitsFor(function () {
      return spy.calledOnce;
    });

    runs(function () {
      expect(poller.active()).toBe(false);
    });

  });

  it('Should keep all events when re-setting options', function () {
    this.mPoller.on('foo', function () {});
    this.mPoller.on('bar', function () {});
    this.mPoller.on('baz', function () {});

    var calls = this.mPoller._events || {};
    expect(_(calls).size()).toBe(3);

    this.mPoller.set({foo: 'bar'});

    runs(function () {
      var calls = this.mPoller._events || {};
      expect(_(calls).size()).toBe(3);
    });
  });

  it('Should rebind when re-setting options', function () {
    var spy = sinon.spy();

    this.mPoller.set({success: spy});
    this.mPoller.set({success: spy});

    this.mPoller.start();

    waitsFor(function () {
      return spy.called;
    });

    runs(function () {
      expect(spy.calledOnce).toBe(true);
    });
  });

  it('shold stop when stopping on a callback', function () {
    spyOn(this.model, 'fetch').andCallThrough();
    this.mPoller.on('success', function () {
      this.mPoller.stop();
    }, this);

    this.mPoller.start();

    waitsFor(function () {
      return this.mPoller.active() === false;
    });

    runs(function () {
      expect(this.model.fetch.callCount).toBe(1);
    });
  });


});

