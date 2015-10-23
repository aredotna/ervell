'use strict';

var coffeeify  =  require('coffeeify')
  , crypto     =  require('crypto')
  , through    =  require('through')
  , cache      =  {};

function getHash(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
}

function cachingCoffeify(file) {
  if (!coffeeify.isCoffee(file)) return through();

  var data = ''
    , stream = through(write, end);

  function write (buf) { data += buf; }
  function end() {
    var hash = getHash(data)
      , cached = cache[file];

    if (!cached || cached.hash !== hash) {
      coffeeify.compile(file, data, function(error, result) {
        if (error) return stream.emit('error', error);
        cache[file] = { compiled: result, hash: hash };
        stream.queue(result);
        stream.queue(null);
      });
    } else {
      stream.queue(cache[file].compiled);
      stream.queue(null);
    }
  }

  return stream;
};

cachingCoffeify.cache = cache;


module.exports = cachingCoffeify;
