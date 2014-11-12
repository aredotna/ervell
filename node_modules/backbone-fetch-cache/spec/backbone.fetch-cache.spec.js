describe('Backbone.fetchCache', function() {
  var model, errorModel, collection, errorCollection, server, modelResponse, errorModelResponse, collectionResponse;
  var originalPriorityFn = Backbone.fetchCache.priorityFn;

  // Async spec waitsFor helpers
  function promiseComplete(promise) {
    return function() {
      return promise.state() !== 'pending';
    };
  }

  function promiseNotified(promise) {
    var notified = false;

    promise.progress(function() {
      notified = true;
    });

    return function() {
      return notified;
    };
  }

  beforeEach(function() {
    model = new Backbone.Model();
    model.url = '/model-cache-test';
    errorModel = new Backbone.Model();
    errorModel.url = '/model-error-cache-test';
    collection = new Backbone.Collection();
    collection.url = '/collection-cache-test';
    errorCollection = new Backbone.Collection();
    errorCollection.url = '/collection-error-cache-test';

    // Mock xhr resposes
    server = sinon.fakeServer.create();
    modelResponse = { sausages: 'bacon' };
    collectionResponse = [{ sausages: 'bacon' }, { rice: 'peas' }];
    server.respondWith('GET', model.url, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(modelResponse)
    ]);
    server.respondWith('GET', collection.url, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(collectionResponse)
    ]);
    server.respondWith('GET', errorModel.url, [
      500,
      { 'Content-Type': 'test/html' },
      'Server Error'
    ]);
    server.respondWith('GET', errorCollection.url, [
      500,
      { 'Content-Type': 'test/html' },
      'Server Error'
    ]);
  });

  afterEach(function() {
    Backbone.fetchCache._cache = {};
    localStorage.clear('backboneCache');
    Backbone.fetchCache.priorityFn = originalPriorityFn;
    server.restore();
  });

  describe('AMD', function() {
    it('defines an AMD module if supported', function() {
      var s = document.createElement('script');
      s.src = '/backbone.fetch-cache.js';

      window.define = jasmine.createSpy('AMD define');
      window.define.amd = true;

      s.onload = function(){
        expect(window.define).toHaveBeenCalled();
      };

      document.body.appendChild(s);
    });
  });

  describe('.getCacheKey', function() {
    it('uses options url with priority if set', function() {
      expect(Backbone.fetchCache.getCacheKey(model, {url: '/options-test-url'}))
        .toEqual('/options-test-url');
    });

    it('uses model url if options url is not set', function() {
      expect(Backbone.fetchCache.getCacheKey(model, {}))
        .toEqual(model.url);
    });

    it('generates a standard querystring', function() {
      var value = {
        'string': 'stringValue',
        'float': 2.1,
        'bool':false
      };
      var expected = model.url + '?string=stringValue&float=2.1&bool=false';
      expect(Backbone.fetchCache.getCacheKey(model, {data: value}))
        .toEqual(expected);
    });

    it('generates a standard querystring if data is a string', function() {
      var value = 'test';
      var expected = model.url + '?test';
      expect(Backbone.fetchCache.getCacheKey(model, {data: value}))
        .toEqual(expected);
    });
  });

  describe('.setCache', function() {
    var opts;

    beforeEach(function() {
      opts = { cache: true };
    });

    it('noops if the instance does not have a url', function() {
      model.url = null;
      Backbone.fetchCache.setCache(model, opts, modelResponse);
      expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
    });

    it('noops unless cache: true is passed', function() {
      Backbone.fetchCache.setCache(model, null, modelResponse);
      expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
    });

    it('keys cache items by the getCacheKey method',function() {
      spyOn(Backbone.fetchCache, 'getCacheKey').andReturn('someCacheKey');
      Backbone.fetchCache.setCache(model, opts, modelResponse);
      expect(Backbone.fetchCache._cache['someCacheKey'].value)
        .toEqual(modelResponse);
    });

    it('calls setLocalStorage', function() {
      spyOn(Backbone.fetchCache, 'setLocalStorage');
      Backbone.fetchCache.setCache(model, opts);
      expect(Backbone.fetchCache.setLocalStorage).toHaveBeenCalled();
    });

    describe('with prefill: true option', function() {
      beforeEach(function() {
        opts = { prefill: true };
      });

      it('caches even if cache: true is not passed', function() {
        var cacheKey = Backbone.fetchCache.getCacheKey(model, opts);
        Backbone.fetchCache.setCache(model, opts, modelResponse);
        expect(Backbone.fetchCache._cache[cacheKey].value)
          .toEqual(modelResponse);
      });

      it('does not cache if cache: false is passed', function() {
        var cacheKey = Backbone.fetchCache.getCacheKey(model, opts);
        opts.cache = false;
        Backbone.fetchCache.setCache(model, this.opts, modelResponse);
        expect(Backbone.fetchCache._cache[cacheKey]).toBeUndefined();
      });

    });

    describe('cache expiry', function() {
      var cacheKey;

      beforeEach(function() {
        this.clock = sinon.useFakeTimers();
        cacheKey = Backbone.fetchCache.getCacheKey(model, this.opts);
      });

      afterEach(function() {
        this.clock.restore();
      });

      it('sets default expiry times for cache keys', function() {
        Backbone.fetchCache.setCache(model, { cache: true }, modelResponse);
        expect(Backbone.fetchCache._cache[cacheKey].expires)
          .toEqual((new Date()).getTime() + (5* 60 * 1000));
      });

      it('sets expiry times for cache keys', function() {
        var opts = { cache: true, expires: 1000 };
        Backbone.fetchCache.setCache(model, opts, modelResponse);
        expect(Backbone.fetchCache._cache[cacheKey].expires)
          .toEqual((new Date()).getTime() + (opts.expires * 1000));
      });

      it('is not set if expires: false is set', function() {
        var opts = { cache: true, expires: false };
        Backbone.fetchCache.setCache(model, opts, modelResponse);
        expect(Backbone.fetchCache._cache[cacheKey].expires)
          .toEqual(false);
      });
    });
  });

  describe('.clearItem', function() {
    beforeEach(function() {
      Backbone.fetchCache._cache = {
        '/item/1': { foo: 'bar' },
        '/item/2': { beep: 'boop' }
      };
    });

    it('deletes a single item from the cache', function() {
      Backbone.fetchCache.clearItem('/item/1');
      expect(Backbone.fetchCache._cache['/item/1']).toBeUndefined();
      expect(Backbone.fetchCache._cache['/item/2']).toEqual({ beep: 'boop' });
    });

    it('updates localStorage', function() {
      spyOn(Backbone.fetchCache, 'setLocalStorage');
      Backbone.fetchCache.clearItem('/item/1');
      expect(Backbone.fetchCache.setLocalStorage).toHaveBeenCalled();
    });
  });

  describe('.setLocalStorage', function() {
    it('puts the cache into localStorage', function() {
      var cache = Backbone.fetchCache._cache = {
        '/url1': { expires: false, value: { bacon: 'sandwich' } },
        '/url2': { expires: false, value: { egg: 'roll' } }
      };
      Backbone.fetchCache.setLocalStorage();
      expect(localStorage.getItem('backboneCache')).toEqual(JSON.stringify(cache));
    });

    it('does not put the cache into localStorage if localStorage is false', function() {
      var cache = Backbone.fetchCache._cache = {
        '/url1': { expires: false, value: { bacon: 'sandwich' } },
        '/url2': { expires: false, value: { egg: 'roll' } }
      };
      Backbone.fetchCache.localStorage = false;
      Backbone.fetchCache.setLocalStorage();

      expect(localStorage.getItem('backboneCache')).toEqual();

      Backbone.fetchCache.localStorage = true; // restore
    });
  });

  describe('.getLocalStorage', function() {
    it('primes the cache from localStorage', function() {
      var cache = {
        '/url1': { expires: false, value: { bacon: 'sandwich' } },
        '/url2': { expires: false, value: { egg: 'roll' } }
      };
      localStorage.setItem('backboneCache', JSON.stringify(cache));
      Backbone.fetchCache.getLocalStorage();
      expect(Backbone.fetchCache._cache).toEqual(cache);
    });

    it('always primes the cache with an object', function() {
      Backbone.fetchCache.getLocalStorage();
      expect(Backbone.fetchCache._cache).toEqual({});
    });
  });

  describe('Automatic expiry when quota is met', function() {
    describe('.prioritize', function() {
      it('prioritizes older results by default', function() {
        var cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        localStorage.setItem('backboneCache', JSON.stringify(cache));
        Backbone.fetchCache.getLocalStorage();
        expect(Backbone.fetchCache._prioritize()).toBeDefined();
        expect(Backbone.fetchCache._prioritize()).toEqual('/url1');
      });
    });

    describe('.priorityFn', function() {
      it('should take a custom priorityFn sorting function', function() {
        var cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        localStorage.setItem('backboneCache', JSON.stringify(cache));
        Backbone.fetchCache.getLocalStorage();
        Backbone.fetchCache.priorityFn = function(a, b) {
          return b.expires - a.expires;
        };
        expect(Backbone.fetchCache._prioritize()).toEqual('/url2');
      });
    });

    describe('.deleteCacheWithPriority', function() {
      it('calls deleteCacheWithPriority if a QUOTA_EXCEEDED_ERR is thrown', function() {
        function QuotaError(message) {
          this.code = 22;
        }

        QuotaError.prototype = new Error();

        spyOn(localStorage, 'setItem').andThrow(new QuotaError());

        spyOn(Backbone.fetchCache, '_deleteCacheWithPriority');

        Backbone.fetchCache._cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        Backbone.fetchCache.setLocalStorage();
        expect(Backbone.fetchCache._deleteCacheWithPriority).toHaveBeenCalled();
      });

      it('calls deleteCacheWithPriority if a QUOTA_EXCEEDED_ERR is thrown in IE', function() {
        function IEQuotaError(message) {
          this.number = 22;
        }

        IEQuotaError.prototype = new Error();

        spyOn(localStorage, 'setItem').andThrow(new IEQuotaError());

        spyOn(Backbone.fetchCache, '_deleteCacheWithPriority');

        Backbone.fetchCache._cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        Backbone.fetchCache.setLocalStorage();
        expect(Backbone.fetchCache._deleteCacheWithPriority).toHaveBeenCalled();
      });

      it('calls deleteCacheWithPriority if a QUOTA_EXCEEDED_ERR is thrown in Firefox', function() {
        function FFQuotaError(message) {
          this.message = 22;
        }

        FFQuotaError.prototype = new Error();

        spyOn(localStorage, 'setItem').andThrow(new FFQuotaError());

        spyOn(Backbone.fetchCache, '_deleteCacheWithPriority');

        Backbone.fetchCache._cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        Backbone.fetchCache.setLocalStorage();
        expect(Backbone.fetchCache._deleteCacheWithPriority).toHaveBeenCalled();
      });

      it('should delete a cached item according to what is returned by priorityFn', function() {
        var cache = {
          '/url1': { expires: 1000, value: { bacon: 'sandwich' } },
          '/url2': { expires: 1500, value: { egg: 'roll' } }
        };
        localStorage.setItem('backboneCache', JSON.stringify(cache));
        Backbone.fetchCache.getLocalStorage();
        Backbone.fetchCache._deleteCacheWithPriority();
        expect(Backbone.fetchCache._cache)
          .toEqual({'/url2': { expires: 1500, value: { egg: 'roll' } }});
      });
    });
  });

  describe('Backbone.Model', function() {
    describe('#fetch', function() {
      var cacheData;

      beforeEach(function() {
        cacheData = { cheese: 'pickle' };
      });

      it('saves returned attributes to the cache', function() {
        var cacheKey = Backbone.fetchCache.getCacheKey(model);
        model.fetch({ cache: true });
        server.respond();
        expect(Backbone.fetchCache._cache[cacheKey].value)
          .toEqual(model.toJSON());
      });

      it('passes the instance and options through to setCache', function() {
        var opts = { banana: 'bread' };
        spyOn(Backbone.fetchCache, 'setCache');

        model.fetch(opts);
        server.respond();

        expect(Backbone.fetchCache.setCache.calls[0].args[0]).toEqual(model);
        expect(Backbone.fetchCache.setCache.calls[0].args[1]).toEqual(opts);
      });

      it('sets data from the cache if cache: true is set', function() {
        Backbone.fetchCache._cache[model.url] = {
          value: cacheData,
          expires: (new Date()).getTime() + (5* 60 * 1000)
        };

        waitsFor(promiseComplete(model.fetch({ cache: true })));

        runs(function() {
          expect(model.toJSON()).toEqual(cacheData);
        });
      });

      it('does not set cache data if cache: true is not set', function() {
        Backbone.fetchCache._cache[model.url] = {
          value: cacheData,
          expires: (new Date()).getTime() + (5* 60 * 1000)
        };

        waitsFor(promiseComplete(model.fetch()));
        server.respond();

        runs(function() {
          expect(model.toJSON()).not.toEqual(cacheData);
          expect(model.toJSON()).toEqual(modelResponse);
        });
      });

      it('does not set cache data if the cache item is stale', function() {
        Backbone.fetchCache._cache[model.url] = {
          value: cacheData,
          expires: (new Date()).getTime() - (5* 60 * 1000)
        };

        waitsFor(promiseComplete(model.fetch()));

        server.respond();

        runs(function() {
          expect(model.toJSON()).not.toEqual(cacheData);
          expect(model.toJSON()).toEqual(modelResponse);
        });
      });

      it('sets cache data if the item has expires: false', function() {
        var cacheData = { cheese: 'pickle' };
        Backbone.fetchCache._cache[model.url] = {
          value: cacheData,
          expires: false
        };

        waitsFor(promiseComplete(model.fetch({ cache: true })));

        runs(function() {
          expect(model.toJSON()).toEqual(cacheData);
        });
      });

      it('returns an unfulfilled promise', function() {
        var promise = model.fetch();
        expect(promise).toBeAPromise();
        expect(promise).toBeUnresolved();
      });

      describe('on AJAX error', function() {

        it('rejects the promise', function() {
          var promise = errorModel.fetch();

          waitsFor(promiseComplete(promise));
          server.respond();

          runs(function() {
            expect(Backbone.fetchCache._cache[errorModel.url]).toBeUndefined();
            expect(promise.state()).toBe('rejected');
          });
        });

        it('calls the error callback', function() {
          var spy = jasmine.createSpy('error');
          var promise = errorModel.fetch({ error: spy });

          waitsFor(promiseComplete(promise));
          server.respond();

          runs(function() {
            expect(Backbone.fetchCache._cache[errorModel.url]).toBeUndefined();
            expect(spy).toHaveBeenCalled();
          });
        });
      });

      describe('on a cache hit', function() {
        var promise, successSpy, cacheData;

        beforeEach(function() {
          cacheData = { cheese: 'pickle' };
          successSpy = jasmine.createSpy('fetch success');

          Backbone.fetchCache._cache[model.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000),
            success: successSpy
          };
          promise = model.fetch({ cache: true });
        });

        it('returns an unfulfilled promise', function() {
          expect(promise).toBeAPromise();
          expect(promise).toBeUnresolved();
        });

        it('fulfills the promise asynchronously', function() {
          waitsFor(promiseComplete(promise));
          runs(function() {
            expect(promise).toBeResolved();
          });
        });

        it('resolves the promise with the model instance', function() {
          promise.done(successSpy);
          waitsFor(promiseComplete(promise));
          runs(function() {
            expect(successSpy).toHaveBeenCalledWith(model);
          });
        });

        it('calls the success callback with the model instance, response data and fetch options', function() {
          var options = {
            cache: true,
            success: successSpy
          };

          waitsFor(promiseComplete(model.fetch(options)));

          runs(function() {
            expect(successSpy).toHaveBeenCalledWith(model, cacheData, options);
          });
        });
      });

      describe('with prefill: true option', function() {
        var cacheData;

        beforeEach(function(){
          cacheData = { cheese: 'pickle' };
          Backbone.fetchCache._cache[model.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };
        });

        it('sets cache data and then makes an xhr request', function() {
          waitsFor(promiseNotified(model.fetch({ prefill: true })));

          runs(function() {
            expect(model.toJSON()).toEqual(cacheData);

            server.respond();

            for (var key in modelResponse) {
              if (modelResponse.hasOwnProperty(key)) {
                expect(model.toJSON()[key]).toEqual(modelResponse[key]);
              }
            }
          });
        });

        it('calls the prefillSuccess and success callbacks in order', function() {
          var prefillSuccess = jasmine.createSpy('prefillSuccess'),
              success = jasmine.createSpy('success');

          var promise = model.fetch({
            prefill: true,
            success: success,
            prefillSuccess: prefillSuccess
          });

          waitsFor(promiseNotified(promise));

          runs(function() {
            expect(prefillSuccess.calls[0].args[0]).toEqual(model);
            expect(prefillSuccess.calls[0].args[1]).toEqual(model.attributes);
            expect(success).not.toHaveBeenCalled();

            server.respond();

            expect(success.calls[0].args[0]).toEqual(model);
            expect(success.calls[0].args[1]).toEqual(modelResponse);
          });
        });

        it('triggers sync on prefill success and success', function() {
          var prefillSuccess = jasmine.createSpy('prefillSuccess'),
              success = jasmine.createSpy('success'),
              sync = jasmine.createSpy('sync'),
              cachesync = jasmine.createSpy('cachesync');

          model.bind('sync', sync);
          model.bind('cachesync', cachesync);

          var promise = model.fetch({
            prefill: true,
            success: success,
            prefillSuccess: prefillSuccess
          });

          waitsFor(promiseNotified(promise));

          runs(function() {
            expect(sync).toHaveBeenCalled();
            expect(sync.callCount).toEqual(1);

            expect(cachesync).toHaveBeenCalled();
            expect(cachesync.callCount).toEqual(1);

            server.respond();

            // Ensure cachesync was not called on this second go around
            expect(cachesync.callCount).toEqual(1);

            expect(sync).toHaveBeenCalled();
            expect(sync.callCount).toEqual(2);

            expect(success.calls[0].args[0]).toEqual(model);
            expect(success.calls[0].args[1]).toEqual(modelResponse);
          });
        });

        it('triggers progress on the promise on cache hit', function() {
          var progress = jasmine.createSpy('progress');
          var promise = model.fetch({ prefill: true }).progress(progress);

          waitsFor(promiseNotified(promise));

          runs(function() {
            expect(progress).toHaveBeenCalledWith(model);
          });
        });

        it('fulfills the promise on AJAX success', function() {
          var success = jasmine.createSpy('success');
          model.fetch({ prefill: true }).done(success);

          server.respond();

          expect(success.calls[0].args[0]).toEqual(model);
          expect(success.calls[0].args[1]).toEqual(modelResponse);
        });
      });

      describe('with async: false option', function() {
        it('resolves synchronously', function() {
          Backbone.fetchCache._cache[model.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          model.fetch({ cache: true, async: false });
          expect(model.toJSON()).toEqual(cacheData);
        });
      });

      describe('with caching disabled', function(){
        beforeEach(function(){
          Backbone.fetchCache.enabled = false;
        });

        afterEach(function(){
          Backbone.fetchCache.enabled = true;
        });

        it("doesn't set cache", function(){
          var cacheKey = Backbone.fetchCache.getCacheKey(model);
          model.fetch({ cache: true });
          server.respond();
          expect(Backbone.fetchCache._cache[cacheKey])
            .toBeUndefined();
        });

        it("doesn't use cache", function(){
          Backbone.fetchCache._cache[model.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          waitsFor(promiseComplete(model.fetch({cache: true})));
          server.respond();

          runs(function() {
            expect(model.toJSON()).not.toEqual(cacheData);
            expect(model.toJSON()).toEqual(modelResponse);
          });
        });
      });
    });

    describe('#sync', function() {
      describe('using model instance url', function () {
        var cacheData;

        beforeEach(function() {
          var cache = {};
          cacheData = { some: 'data' };
          cache[model.url] = cacheData;
          localStorage.setItem('backboneCache', JSON.stringify(cache));
          Backbone.fetchCache.getLocalStorage();
        });

        it('clears the cache for the model on create', function() {
          model.sync('create', model, {});
          expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
        });

        it('clears the cache for the model on update', function() {
          model.sync('update', model, {});
          expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
        });

        it('clears the cache for the model on patch', function() {
          model.sync('create', model, {});
          expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
        });

        it('clears the cache for the model on delete', function() {
          model.sync('create', model, {});
          expect(Backbone.fetchCache._cache[model.url]).toBeUndefined();
        });

        it('does not clear the cache for the model on read', function() {
          model.sync('read', model, {});
          expect(Backbone.fetchCache._cache[model.url]).toEqual(cacheData);
        });
      });
      describe('using options-given url', function() {
        var cacheData;
        var optionsGiven;

        beforeEach(function() {
          optionsGiven = { 'url' : '/given-url' };
          var cache = {};
          cacheData = { some: 'data' };
          cache[optionsGiven.url] = cacheData;
          localStorage.setItem('backboneCache', JSON.stringify(cache));
          Backbone.fetchCache.getLocalStorage();
        });

        it('clears the cache for the model on create', function() {
          model.sync('create', model, optionsGiven);
          expect(Backbone.fetchCache._cache[optionsGiven.url]).toBeUndefined();
        });

        it('clears the cache for the model on update', function() {
          model.sync('update', model, optionsGiven);
          expect(Backbone.fetchCache._cache[optionsGiven.url]).toBeUndefined();
        });

        it('clears the cache for the model on patch', function() {
          model.sync('create', model, optionsGiven);
          expect(Backbone.fetchCache._cache[optionsGiven.url]).toBeUndefined();
        });

        it('clears the cache for the model on delete', function() {
          model.sync('create', model, optionsGiven);
          expect(Backbone.fetchCache._cache[optionsGiven.url]).toBeUndefined();
        });

        it('does not clear the cache for the model on read', function() {
          model.sync('read', model, optionsGiven);
          expect(Backbone.fetchCache._cache[optionsGiven.url]).toEqual(cacheData);
        });
      });

      it('calls super', function() {
        spyOn(Backbone.fetchCache._superMethods, 'modelSync');
        model.sync('create', model, {});
        expect(Backbone.fetchCache._superMethods.modelSync).toHaveBeenCalled();
      });

      it('returns the result of calling super', function() {
        expect(model.sync('create', model, {})).toBeAPromise();
      });

      describe('with an associated collection', function() {
        beforeEach(function() {
          var cache = {};
          model.collection = collection;
          cache[Backbone.fetchCache.getCacheKey(collection)] = [{ some: 'data' }];
          localStorage.setItem('backboneCache', JSON.stringify(cache));
          Backbone.fetchCache.getLocalStorage();
        });

        it('clears the cache for the collection', function() {
          var cacheKey = Backbone.fetchCache.getCacheKey(collection);
          model.sync('create', model, {});
          expect(Backbone.fetchCache._cache[cacheKey]).toBeUndefined();
        });
      });
    });
  });

  describe('Backbone.Collection', function() {
    describe('#fetch', function() {
      var cacheData;

      beforeEach(function() {
        cacheData = [{ cheese: 'pickle' }, { salt: 'vinegar' }];
      });

      it('returns an unfulfilled promise', function() {
        var promise = collection.fetch();
        expect(promise).toBeAPromise();
        expect(promise).toBeUnresolved();
      });

      it('saves returned attributes to the cache', function() {
        collection.fetch({ cache: true });
        server.respond();
        expect(Backbone.fetchCache._cache[collection.url].value)
          .toEqual(collection.toJSON());
      });

      it('passes the instance and options through to setCache', function() {
        var opts = { banana: 'bread' };
        spyOn(Backbone.fetchCache, 'setCache');

        collection.fetch(opts);
        server.respond();

        expect(Backbone.fetchCache.setCache.calls[0].args[0]).toEqual(collection);
        expect(Backbone.fetchCache.setCache.calls[0].args[1]).toEqual(opts);
      });

      it('sets data cache data if cache: true is set', function() {
        Backbone.fetchCache._cache[collection.url] = {
          value: cacheData,
          expires: (new Date()).getTime() + (5* 60 * 1000)
        };

        waitsFor(promiseComplete(collection.fetch({
          cache: true
        })));

        runs(function() {
          expect(collection.toJSON()).toEqual(cacheData);
        });
      });

      it('does not set cache data if cache: true is not set', function() {
        Backbone.fetchCache._cache[collection.url] = {
          value: cacheData,
          expires: (new Date()).getTime() + (5* 60 * 1000)
        };

        collection.fetch();
        server.respond();

        expect(collection.toJSON()).not.toEqual(cacheData);
        expect(collection.toJSON()).toEqual(collectionResponse);
      });

      it('does not set cache data if the cache item is stale', function() {
        Backbone.fetchCache._cache[collection.url] = {
          value: cacheData,
          expires: (new Date()).getTime() - (5* 60 * 1000)
        };

        collection.fetch();
        server.respond();

        expect(collection.toJSON()).not.toEqual(cacheData);
        expect(collection.toJSON()).toEqual(collectionResponse);
      });

      it('sets cache data if the item has expires: false', function() {
        Backbone.fetchCache._cache[collection.url] = {
          value: cacheData,
          expires: false
        };

        waitsFor(promiseComplete(collection.fetch({
          cache: true
        })));

        runs(function() {
          expect(collection.toJSON()).toEqual(cacheData);
        });
      });

      describe('on AJAX error', function() {

        it('rejects the promise', function() {
          var promise = errorCollection.fetch();

          waitsFor(promiseComplete(promise));
          server.respond();

          runs(function() {
            expect(Backbone.fetchCache._cache[errorCollection.url]).toBeUndefined();
            expect(promise.state()).toBe('rejected');
          });
        });

        it('calls the error callback', function() {
          var spy = jasmine.createSpy('error');
          var promise = errorCollection.fetch({ error: spy });

          waitsFor(promiseComplete(promise));
          server.respond();

          runs(function() {
            expect(Backbone.fetchCache._cache[errorCollection.url]).toBeUndefined();
            expect(spy).toHaveBeenCalled();
          });
        });
      });

      describe('on cache hit', function() {
        it('returns an unfulfilled promise', function() {
          var promise = collection.fetch({ cache: true });
          expect(promise).toBeAPromise();
          expect(promise).toBeUnresolved();
        });

        it('calls set according to options', function() {
          var options = { cache: true, remove: false };

          spyOn(collection, 'set');
          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          waitsFor(promiseComplete(collection.fetch(options)));

          runs(function() {
            expect(collection.set).toHaveBeenCalledWith(cacheData, options);
          });
        });

        it('calls reset according to options', function() {
          var options = { cache: true, reset: true };

          spyOn(collection, 'reset');
          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          waitsFor(promiseComplete(collection.fetch(options)));

          runs(function() {
            expect(collection.reset).toHaveBeenCalledWith(cacheData, options);
          });
        });

        it('fulfills the promise with the collection instance', function() {
          var spy = jasmine.createSpy('success');

          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          var promise = collection.fetch({ cache: true }).done(spy);

          waitsFor(promiseComplete(promise));
          runs(function() {
            expect(spy).toHaveBeenCalledWith(collection);
          });
        });

        it('calls success callback with the collection instance, response data and fetch options', function() {
          var success = jasmine.createSpy('success');
          var options = {
            cache: true,
            success: success
          };

          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };

          waitsFor(promiseComplete(collection.fetch(options)));

          runs(function() {
            expect(success).toHaveBeenCalledWith(collection, cacheData, options);
          });
        });
      });

      describe('with prefill: true option', function() {
        beforeEach(function(){
          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() + (5* 60 * 1000)
          };
        });

        it('sets cache data and makes an xhr request', function() {
          waitsFor(promiseNotified(collection.fetch({ prefill: true })));

          runs(function() {
            expect(collection.toJSON()).toEqual(cacheData);

            server.respond();

            expect(collection.toJSON()).toEqual(collectionResponse);
          });
        });

        it('calls the prefillSuccess and success callbacks in order', function() {
          var prefillSuccess = jasmine.createSpy('prefillSuccess'),
              success = jasmine.createSpy('success');

          waitsFor(promiseNotified(collection.fetch({
            prefill: true,
            success: success,
            prefillSuccess: prefillSuccess
          })));

          runs(function() {
            expect(prefillSuccess.calls[0].args[0]).toEqual(collection);
            expect(prefillSuccess.calls[0].args[1]).toEqual(collection.attributes);
            expect(success).not.toHaveBeenCalled();

            server.respond();
            expect(success.calls[0].args[0]).toEqual(collection);
            expect(success.calls[0].args[1]).toEqual(collectionResponse);
          });
        });

        it('triggers sync on prefill success and success', function() {
          var prefillSuccess = jasmine.createSpy('prefillSuccess'),
              success = jasmine.createSpy('success'),
              sync = jasmine.createSpy('sync'),
              cachesync = jasmine.createSpy('cachesync');

          collection.bind('sync', sync);
          collection.bind('cachesync', cachesync);

          waitsFor(promiseNotified(collection.fetch({
            prefill: true,
            success: success,
            prefillSuccess: prefillSuccess
          })));

          runs(function() {
            expect(sync).toHaveBeenCalled();
            expect(sync.callCount).toEqual(1);

            expect(cachesync).toHaveBeenCalled();
            expect(cachesync.callCount).toEqual(1);

            server.respond();

            // Ensure cachesync was not called on this second go around
            expect(cachesync.callCount).toEqual(1);

            expect(sync).toHaveBeenCalled();
            expect(sync.callCount).toEqual(2);

            expect(success.calls[0].args[0]).toEqual(collection);
            expect(success.calls[0].args[1]).toEqual(collectionResponse);
          });
        });

        it('triggers progress on the promise on cache hit', function() {
          var progress = jasmine.createSpy('progeress');
          var promise = collection.fetch({ prefill: true }).progress(progress);

          waitsFor(promiseNotified(promise));

          runs(function() {
            expect(progress).toHaveBeenCalledWith(collection);
          });
        });

        it('fulfills the promise on AJAX success', function() {
          var success = jasmine.createSpy('success');
          collection.fetch({ prefill: true }).done(success);
          server.respond();

          expect(success.calls[0].args[0]).toEqual(collection);
          expect(success.calls[0].args[1]).toEqual(collectionResponse);
        });
      });
      describe('with caching disabled', function(){
        beforeEach(function(){
          Backbone.fetchCache.enabled = false;
        });

        afterEach(function(){
          Backbone.fetchCache.enabled = true;
        });

        it("doesn't set cache", function(){
          collection.fetch({ cache: true });
          server.respond();
          expect(Backbone.fetchCache._cache[collection.url])
            .toBeUndefined();
        });

        it("doesn't use cache", function(){
          Backbone.fetchCache._cache[collection.url] = {
            value: cacheData,
            expires: (new Date()).getTime() - (5* 60 * 1000)
          };

          collection.fetch({cache: true});
          server.respond();

          expect(collection.toJSON()).not.toEqual(cacheData);
          expect(collection.toJSON()).toEqual(collectionResponse);
        });
      });
    });
  });
  describe('Prefix', function() {
    beforeEach(function() {
      Backbone.fetchCache.getLocalStorageKey = function() {
        return 'backboneCache_user1';
      };
    });

    it('get prefix', function() {
      expect(Backbone.fetchCache.getLocalStorageKey()).toEqual('backboneCache_user1');
    });

    it('set localStorage', function() {
      var cache = Backbone.fetchCache._cache = {
        '/url1': { expires: false, value: { bacon: 'sandwich' } },
        '/url2': { expires: false, value: { egg: 'roll' } }
      };
      Backbone.fetchCache.setLocalStorage();
      expect(localStorage.getItem('backboneCache_user1')).toEqual(JSON.stringify(cache));
    });

    it('get localStorage', function() {
      var cache = {
        '/url1': { expires: false, value: { bacon: 'sandwich' } },
        '/url2': { expires: false, value: { egg: 'roll' } }
      };
      localStorage.setItem('backboneCache_user1', JSON.stringify(cache));
      Backbone.fetchCache.getLocalStorage();
      expect(Backbone.fetchCache._cache).toEqual(cache);
    });

    it('get localStorage for several users', function() {
      Backbone.fetchCache.getLocalStorageKey = function() {
        return 'backboneCache_user2';
      };
      var cache = Backbone.fetchCache._cache = {
        '/url1': { expires: true, value: { vegetables: 'tomato' } },
        '/url2': { expires: true, value: { egg: 'roll' } }
      };
      localStorage.setItem('backboneCache_user1', '');
      Backbone.fetchCache.setLocalStorage();
      expect(localStorage.getItem('backboneCache_user2')).toEqual(JSON.stringify(cache));
      expect(localStorage.getItem('backboneCache_user1')).toEqual('');
    });
  });
});
