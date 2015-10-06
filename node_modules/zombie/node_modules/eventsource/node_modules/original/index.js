'use strict';

var parse = require('url-parse');

/**
 * Transform an URL to a valid origin value.
 *
 * @param {String|Object} url URL to transform to it's origin.
 * @returns {String} The origin.
 * @api public
 */
function origin(url) {
  if ('string' === typeof url) {
    //
    // In order to correctly parse an URL it needs to be prefixed with
    // a protocol or the parsers will all assume that the information we've
    // given is a pathname instead of an URL. So we need to do a sanity check
    // before parsing.
    //
    if (!/^(http|ws|file|blob)s?:/i.test(url)) url = 'http://'+ url;
    url = parse(url.toLowerCase());
  }

  //
  // 6.2.  ASCII Serialization of an Origin
  // http://tools.ietf.org/html/rfc6454#section-6.2
  //
  // @TODO If we cannot generate a proper origin from the URL because
  // origin/host/port information is missing we should return the string `null`
  //

  var protocol = url.protocol
    , port = url.port && +url.port;

  //
  // 4. Origin of a URI
  // http://tools.ietf.org/html/rfc6454#section-4
  //
  // States that url.scheme, host should be converted to lower case. This also
  // makes it easier to match origins as everything is just lower case.
  //
  return (url.protocol +'//'+ url.hostname + (!port ? '' : ':'+ port)).toLowerCase();
}

/**
 * Check if the origins are the same.
 *
 * @param {String} a URL or origin of a.
 * @param {String} b URL or origin of b.
 * @returns {Boolean}
 * @api public
 */
origin.same = function same(a, b) {
  return origin(a) === origin(b);
};

//
// Expose the origin
//
module.exports = origin;
