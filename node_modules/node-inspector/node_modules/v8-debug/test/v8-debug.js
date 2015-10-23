var expect = require('chai').expect,
    v8debug = require('../');

var _debugger = require('child_process').spawn('node', ['./test/helpers/debugger.js']);

_debugger.stderr.on('data', function(data) {
  throw new Error(data);
});

describe('v8-debug', function() {
  before(function(done) {
    _debugger.stdout.on('data', function(data) {
      console.log('    ' + data);
      done();
    });
  });

  describe('function `runInDebugContext`', function() {
    it('returns Debug object', function() {
      var Debug = v8debug.runInDebugContext('Debug');
      expect(typeof Debug).to.equal('object');
    });

    it('returns compiled function object', function() {
      var Debug = v8debug.runInDebugContext(function(){return Debug;});
      expect(typeof Debug).to.equal('object');
    });
  });

  describe('Webkit protocol', function() {
    it('if disabled, registerAgentCommand should throw error', function() {
      expect(v8debug.registerAgentCommand.bind(v8debug, 'command', [], function() {})).to.throw();
    });

    it('enableWebkitProtocol should enable Webkit protocol', function() {
      v8debug.enableWebkitProtocol();
      expect(v8debug.enableWebkitProtocol.bind(v8debug)).to.not.throw();
    });

    it('if enabled registerAgentCommand should register command', function(done) {
      expect(v8debug.registerAgentCommand.bind(v8debug, 'command', [], function() {
        done();
      })).to.not.throw();
      v8debug.sendCommand('command');
    });
  });

  describe('events.', function() {
    it('Emits `close` on disconnect command', function(done) {
      v8debug.on('close', done);
      v8debug.sendCommand('disconnect');
    });
  });
});
