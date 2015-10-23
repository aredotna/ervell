var expect = require('chai').expect;
var binary = require('node-pre-gyp');
var path = require('path');
var binding_path = binary.find(path.resolve(path.join(__dirname,'../package.json')));


describe('binding', function() {
  var binding = require(binding_path);
  it('source was builded and can be accessed from script', function() {
    expect(binding).to.be.instanceof(Object);
  });

  describe('core', function() {
    describe('function `call`', function() {
      it('should rethrow ReferenceError', function() {
        expect(binding.call.bind(null, function() {
          "use strict";
          if (error_here) return;
        })).to.throw(ReferenceError);
      });

      it('should rethrow SyntaxError', function() {
        expect(binding.call.bind(null, function() {
          eval('[');
        })).to.throw(SyntaxError);
      });
    });
  });

  describe('InjectedScriptHost', function() {
    var host = binding.InjectedScriptHost;

    describe('function `subtype`', function() {
      checksTypeValid(new Array(), 'array');
      checksTypeValid(new Date(), 'date');
      checksTypeValid(new RegExp(), 'regexp');
      checksTypeValid(new Error(), 'error');
      checksTypeValid(new String(), undefined);

      function checksTypeValid(value, type) {
        it('checks ' + type + ' subtype', function() {
          expect(host.subtype(value)).to.equal(type);
        });
      }

      it('should throw on wrong arguments', function() {
        expect(host.subtype).to.throw();
      });
    });

    describe('function `setNonEnumProperty`', function() {
      it('should set non enumerable property to object', function() {
        var object = {
          'visibleProp': '1'
        };
        host.setNonEnumProperty(object, 'hiddenProp', 'value');
        var keys = Object.keys(object);
        expect(keys).to.deep.equal(['visibleProp']);
        expect(object.hiddenProp).to.equal('value');
      });

      throwsOnArgs([]);
      throwsOnArgs([{}, 'a']);
      throwsOnArgs([{}, null, 'b']);
      throwsOnArgs([null, {}, 'b']);

      function throwsOnArgs(argvList) {
        it('should throw on wrong arguments ' + JSON.stringify(argvList), function() {
          expect(host.setNonEnumProperty.bind.apply(
            host.setNonEnumProperty, [host].concat(argvList))).to.throw();
        });
      }

      it('should not throw on valid arguments', function() {
        expect(host.setNonEnumProperty.bind(host, {}, 'a', null)).to.not.throw();
        expect(host.setNonEnumProperty.bind(host, {}, 'a', 'b')).to.not.throw();
      });
    });

    describe('function `internalConstructorName`', function() {
      checksNameValid(new Number(), 'Number');
      checksNameValid(new Object(), 'Object');

      function checksNameValid(value, name) {
        it('checks new ' + name + '() constructor name', function() {
          expect(host.internalConstructorName(value)).to.equal(name);
        });
      }

      throwsOnArgs([]);
      throwsOnArgs([1]);
      throwsOnArgs([null]);

      function throwsOnArgs(argvList) {
        it('should throw on wrong arguments ' + JSON.stringify(argvList), function() {
          expect(host.internalConstructorName.bind.apply(
            host.internalConstructorName, [host].concat(argvList))).to.throw();
        });
      }
    });

    describe('function `functionDetailsWithoutScopes`', function() {
      it('should return valid details', function() {
        function example() {}

        var details = host.functionDetailsWithoutScopes(example);
        expect(details).to.include.keys(['location', 'functionName']);
        expect(details.location).to.include.keys(['lineNumber', 'columnNumber', 'scriptId']);
      });

      throwsOnArgs([]);
      throwsOnArgs([null]);

      function throwsOnArgs(argvList) {
        it('should throw on wrong arguments ' + JSON.stringify(argvList), function() {
          expect(host.functionDetailsWithoutScopes.bind.apply(
            host.functionDetailsWithoutScopes, [host].concat(argvList))).to.throw();
        });
      }
    });

    describe('function `eval`', function() {
      it('should evaluate expression', function() {
        expect(host.eval("[1]")).to.deep.equal([1]);
      });

      it('should throw on wrong arguments', function() {
        expect(host.eval).to.throw();
      });

      it('should throw on wrong expression', function() {
        expect(host.eval.bind(null, "[1")).to.throw(SyntaxError);
      });
    });

    describe('function `evaluateWithExceptionDetails`', function() {
      it('should evaluate expression', function() {
        expect(host.evaluateWithExceptionDetails("[1]")).to.deep.equal({
          result: [1],
          exceptionDetails: undefined
        });
      });

      it('should throw on wrong arguments', function() {
        expect(host.evaluateWithExceptionDetails).to.throw();
      });
    });

    describe('function `callFunction`', function() {
      it('should call function without args', function(done) {
        host.callFunction(done, this);
      });

      it('should call function with args', function(done) {
        host.callFunction(function(arg) {
          expect(arg).to.equal(1);
          done();
        }, this, [1]);
      });

      it('should throw on wrong arguments', function() {
        expect(host.callFunction.bind(null, null, null, [1])).to.throw();
        expect(host.callFunction.bind(null, null, null, 1)).to.throw();
      });

      it('should rethrow ReferenceError', function() {
        expect(host.callFunction.bind(null, function() {
          'use strict';
          if (error_here) return;
        }, this)).to.throw(ReferenceError);
      });
    });
  });
});
