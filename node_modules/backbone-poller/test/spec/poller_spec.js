/*global jasmine, Backbone */
/* jshint strict:false, maxstatements: false*/
describe('Base poller operations', function() {

  function hasManagerAPI(manager){
    var method, api = ['get', 'size', 'reset'];
    while((method = api.shift()) !== undefined) {
      expect(manager[method]).toEqual(jasmine.any(Function));
    }
  }

  var _sync = function(method, model, options){
    options.success(model.toJSON());
    model.trigger('sync');
    return {
      abort: function () {}
    };
  };

  describe('Poller funcionality', function() {



    beforeEach(function() {
      this.model = new Backbone.Model();
      this.collection = new Backbone.Collection();
      this.model.sync = this.collection.sync = _sync;

      this.mPoller = Backbone.Poller.get(this.model, {delay: 50});
      this.cPoller = Backbone.Poller.get(this.collection, {delay: 50});
    });

    afterEach(function(){
      this.model.destroy();
      this.collection.reset();

      delete this.model;
      delete this.collection;

      Backbone.Poller.reset();
    });


    function hasPollerAPI(poller){
      var method, api = ['set', 'active', 'start', 'stop'];
      while((method = api.shift()) !== undefined) {
        expect(poller[method]).toEqual(jasmine.any(Function));
      }
    }

    it('Should not have legacy support for PollingManager global object', function(){
      expect(window.PollingManager).toBeUndefined();
    });

    it('Should have all supported methods on API', function(){
      hasManagerAPI(Backbone.Poller);
      hasPollerAPI(this.mPoller);
      hasPollerAPI(this.cPoller);
    });

    it('Should delete all pollers when calling reset()', function(){
      Backbone.Poller.reset();
      expect(Backbone.Poller.size()).toEqual(0);
    });

    it('Should stop all pollers when calling reset()', function(){
      this.mPoller.start();
      this.cPoller.start();
      expect(this.mPoller.active()).toEqual(true);
      expect(this.cPoller.active()).toEqual(true);
      Backbone.Poller.reset();
      expect(this.mPoller.active()).toEqual(false);
      expect(this.cPoller.active()).toEqual(false);
    });


    it('Should not create more than one instance per model', function() {
      var mPoller1 = Backbone.Poller.get(this.model);
      expect(mPoller1).toBe(this.mPoller);
      expect(Backbone.Poller.size()).toEqual(2);
    });

    it('Should create a unique instnace per model', function() {
      var mPoller = Backbone.Poller.get(new Backbone.Model());

      expect(mPoller).not.toBe(this.mPoller);
      expect(Backbone.Poller.size()).toEqual(3);
    });

    it('Should start when invoking start()', function() {
      spyOn(this.model, 'fetch');
      expect(this.mPoller.active()).toBe(false);
      this.mPoller.start();
      expect(this.mPoller.active()).toBe(true);
      expect(this.model.fetch).toHaveBeenCalled();
    });

    describe('Run delayed', function () {

      beforeEach(function () {
        this.options = {delay: 100, delayed: true};
        spyOn(this.model, 'fetch');
        expect(this.mPoller.active()).toBe(false);
      });

      afterEach(function () {
        this.mPoller.stop();
      });

      it('Should start delayed when invoking start() with a flag', function() {
        this.mPoller.set(this.options).start();
        expect(this.mPoller.active()).toBe(true);
        expect(this.model.fetch).not.toHaveBeenCalled();
        waits(101);
        runs(function () {
          expect(this.model.fetch).toHaveBeenCalled();
        });
      });

      it('Shouls not run when condition is falsy on run time', function () {
        var doRun = true;
        this.options.condition = function () {
          return doRun;
        };
        this.mPoller.set(this.options).start();
        expect(this.mPoller.active()).toBe(true);
        expect(this.model.fetch).not.toHaveBeenCalled();

        doRun = false;

        waits(101);
        runs(function () {
          expect(this.mPoller.active()).toBe(false);
          expect(this.model.fetch).not.toHaveBeenCalled();
        });
      });

      it('Should not reset delayed flag on start', function(){
        this.mPoller.set(this.options).start();
        expect(this.mPoller.options.delayed).toBe(true);
      });

      it('accepts delayed as a number', function () {
        this.mPoller.set( {delay: 15, delayed: 100}).start();
        this.model.fetch.andCallThrough();
        waits(15);
        runs(function () {
          expect(this.model.fetch).not.toHaveBeenCalled();
        });
        waits(85);
        runs(function () {
          expect(this.model.fetch).toHaveBeenCalled();
          expect(this.model.fetch.callCount).toBe(1);
        });
        waits(15);
        runs(function () {
          expect(this.model.fetch.callCount).toBe(2);
        });
        waits(15);
        runs(function () {
          expect(this.model.fetch.callCount).toBe(3);
        });
      });

    });



    it('Should stop when invoking stop()', function() {
      this.mPoller.start();

      expect(this.mPoller.active()).toBe(true);
      this.mPoller.stop();

      expect(this.mPoller.active()).toBe(false);
    });

    it('Should abort XHR (only once) when invoking stop()', function() {

      expect(this.mPoller.xhr).toBeNull();

      this.mPoller.start();

      expect(this.mPoller.xhr).not.toBeNull();
      spyOn(this.mPoller.xhr, 'abort').andCallThrough();

      var spy = this.mPoller.xhr.abort;
      expect(spy.callCount).toEqual(0);

      this.mPoller.stop();
      expect(spy.callCount).toEqual(1);
      expect(this.mPoller.xhr).toBeNull();

      this.mPoller.stop();
      expect(spy.callCount).toEqual(1);
    });

    it('Should stop when condition is satisfied', function() {
      var bool = true,
      options = { delay: 50, condition: function() { return bool; } },
      poller = Backbone.Poller.get(this.model, options).start();

      expect(poller.active()).toBe(true);

      bool = false;
      waits(50);

      runs(function(){
        expect(poller.active()).toBe(false);
      });

    });

    it('Should fetch more than once when polling a model', function() {
      var counter = 1;
      var flag = false;

      spyOn(this.model, 'fetch').andCallThrough();

      this.mPoller.start();

      this.mPoller.on('success', function(){
        flag = (++counter == 4);
      });

      waitsFor(function(){
        return flag;
      });

      runs(function(){
        expect(this.mPoller.active()).toBe(true);
      });


    });

    it('Should fetch more than once when polling a collection', function() {
      var counter = 1;
      var flag = false;

      spyOn(this.collection, 'fetch').andCallThrough();

      this.cPoller.on('success', function(){
        flag = (++counter == 4);
      });
      this.cPoller.start();

      waitsFor(function(){
        return flag;
      });

      runs(function () {
        expect(this.cPoller.active()).toBe(true);
      });

    });

    it('should maintain a copy of model fetch promise', function () {
      var poller = this.mPoller;
      expect(poller.xhr).toBeNull();
      poller.start();
      expect(poller.xhr).not.toBeNull();
    });

    it('should maintain a timeout Id to manage polling', function () {
      var poller = this.mPoller;
      expect(poller.timeoutId).toBeNull();
      poller.start();
      expect(poller.timeoutId).toEqual(jasmine.any(Number));
    });

    it('should be active when running', function () {
      var poller = this.mPoller;
      expect(poller.active()).toBe(false);
      poller.start();
      expect(poller.active()).toBe(true);
    });

    it('Sould have a reset the poller\'s xhr and timeoutId when stopped', function(){
      var poller = this.mPoller.start().stop();

      expect(poller.active()).toBe(false);
      expect(poller.xhr).toBeNull();
      expect(poller.timeoutId).toBeNull();
    });


    it('Should stop when model is destroyed', function() {
      spyOn(this.model, 'destroy').andCallThrough();
      this.mPoller.start();
      this.model.destroy();
      expect(this.mPoller.active()).toBe(false);

    });


    describe('backoff and getDelay', function() {

      it('return a constanct delay when backoff is undefined', function () {
        this.mPoller.set({delay: 1000});
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1000);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1000);
      });

      it('return a constanct delay when backoff is turned off', function () {
        this.mPoller.set({delay: 1000, backoff: false});
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1000);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1000);
      });

      it('backoff multiples by 2 by default when enabled', function () {
        this.mPoller.set({delay: [100, 1600]});
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(100);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(200);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(400);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(800);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1600);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(1600);
      });

      it('backoff multiples by n when specified', function () {
        this.mPoller.set({delay: [100, 2700, 3]});
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(100);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(300);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(900);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(2700);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(2700);
      });

      it('backoff multiples by custom function when provided', function () {
        this.mPoller.set({delay: [100, 550, function (n) {
          return n * 1.5;
        }]});
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(100);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(150);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(225);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(338);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(506);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(550);
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(550);
      });

      xit('stops at 10x the original delay value', function () {
        this.mPoller.set({delay: 100, backoff: true});

        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(100);
        this.mPoller._backoff = 500;
        expect(Backbone.Poller.getDelay(this.mPoller)).toBe(3000);
      });

    });


  });

  describe('AMD support', function() {

    window.require = {
      paths: {
        underscore: 'bower_components/underscore/underscore',
        jquery: 'bower_components/jquery/dist/jquery',
        backbone: 'bower_components/backbone/backbone'
      }
    };

    beforeEach(function () {

      var self = this;
      var hasRequireJS = false;

      runs(function () {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        node.async = 'true';
        if ( node.attachEvent ) {
          node.attachEvent('onreadystatechange', function() { hasRequireJS = true; });
        }
        else {
          node.addEventListener('load', function () { hasRequireJS = true; }, false);
        }
        node.src = 'bower_components/requirejs/require.js';
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(node);
      });


      waitsFor(function () {
        return hasRequireJS;
      });

      runs(function() {
        require(['./backbone.poller'], function (Poller) {
          self.Poller = Poller;
        });
      });

      waitsFor(function () {
        return !!self.Poller;
      });


    });

    afterEach(function () {
      // give Poller back to window to avoid breaking the environment
      // this is dirty but having a AMD env with a non-AMD env gets tricky
      window.Backbone.Poller = this.Poller;
    });


    it('should load as an AMD module', function() {
      var self = this;
      runs(function () {
        hasManagerAPI(self.Poller);
      });

    });



  });

});
