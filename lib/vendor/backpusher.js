//     Backpusher.js 0.0.2
//     (c) 2011-2012 Pusher.
//     Backpusher may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://github.com/pusher/backpusher
Backbone = require("backbone");
_ = require('underscore');

;(function(exports, undefined){
  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backpusher = function(channel, collection, options) {
    if (!(this instanceof Backpusher)) {
      return new Backpusher(channel, collection, options);
    }

    // Bind for the connection established, so
    // we can setup the socket_id param.
    if (channel.pusher.connection) {
      if(channel.pusher.connection.state == 'connected'){
        Backbone.pusher_socket_id = channel.pusher.connection.socket_id;
      }
      channel.pusher.connection.bind('connected', function() {
        Backbone.pusher_socket_id = channel.pusher.connection.socket_id;
      });
    } else {
      channel.bind('pusher:connection_established', function() {
        Backbone.pusher_socket_id = channel.pusher.socket_id;
      });
    }
    // Options is currently unused:
    this.options = (options || {});
    this.channel = channel;
    this.collection = collection;

    if (this.options.events) {
      this.events = this.options.events;
    } else {
      this.events = Backpusher.defaultEvents;
    }

    this._bindEvents();
    this.initialize(channel, collection, options);

    this.dispose = function() {
      this.options = null;
      this.channel = null;
      this.collection = null;
    }
  };

  _.extend(Backpusher.prototype, Backbone.Events, {
    initialize: function() {},

    _bindEvents: function() {
      if (!this.events) return;

      for (var event in this.events) {
        this.channel.bind(event, _.bind(this.events[event], this));
      }
    },

    _add: function(model) {
      console.log(model);
      var Collection = this.collection;
      model = new Collection.model(model);
      model.options.wait = true;

      Collection.add(model);
      this.trigger('remote_create', model);

      return model;
    }
  });

  Backpusher.defaultEvents = {
    created: function(pushed_model) {
      return this._add(pushed_model);
    },

    updated: function(pushed_model) {
      var model = this.collection.get(pushed_model);

      if (model) {
        model = model.set(pushed_model);

        this.trigger('remote_update', model);
        model.trigger('remote_update', model);

        return model;
      } else {
        return this._add(pushed_model);
      }
    },

    destroyed: function(pushed_model) {
      var model = this.collection.get(pushed_model);

      if (model) {
        this.collection.remove(model);
        this.trigger('remote_destroy', model);

        return model;
      }
    }
  };

  // Add socket ID to every Backbone.sync request
  var origBackboneSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    options.headers = _.extend(
      { 'X-Pusher-Socket-ID': Backbone.pusher_socket_id },
      options.headers
    );

    return origBackboneSync(method, model, options);
  };

  // Export:
  exports.Backpusher = Backpusher;
})((typeof exports !== 'undefined' ? exports : this));