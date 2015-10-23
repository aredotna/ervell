var path = require('path');
var glob = require('glob');
var fs = require('fs');
var knox = require('knox');
var exec = require('child_process').exec;
var _ = require('underscore');
var crypto = require('crypto');
var NODE_ENV = process.env.NODE_ENV;
var COMMIT_HASH = process.env.COMMIT_HASH;
var mime = require('mime');
var request = require('superagent');
var async = require('async');

// Middleware to find your uploaded assets based on git hash & uploaded manifest.
//
// @param {Object} options See README.md for details

module.exports = function(options) {
  // If it's not production or staging, just return the noop view helper
  if (NODE_ENV != 'staging' && NODE_ENV != 'production')
    return function(req, res, next) {
      res.locals.asset = function(filename) { return filename };
      next();
    }
  // Setup callbacks so we can queue requets until we've got the manifest.
  var manifest, opts, manifestErr, manifestCallbacks = [];
  var onManifestFetched = function(callback) {
    manifestCallbacks.push(callback);
  };
  var manifestCallback = function(err) {
    manifestCallbacks.forEach(function(callback) {
      callback(err);
    });
  }
  // Fetch the manifest
  setup(options, function(err, options) {
    opts = options;
    if (err) return manifestCallback(manifestErr = err);
    request.get(opts.cdnUrl + '/manifest-' + options.hash + '.json').end(function(err, res) {
      if (err) return manifestCallback(manifestErr = err);
      try {
        manifest = JSON.parse(res.text);
        manifestCallback();
      } catch (err) {
        console.warn(res.text);
        manifestCallback(manifestErr = err);
      }
    });
  });
  // Once the manifest is fetched attach a helper to lookup the file in the
  // manifest or noop. This will prefer .gz/.cgz/.jgz extensioned versions
  // if they exist.
  return function(req, res, next) {
    if (manifestErr) return next(manifestErr);
    res.locals.asset = function(filename) {
      var manifestFile = manifest[filename + '.gz']  ||
        manifest[filename + '.cgz'] || manifest[filename + '.jgz'] ||
        manifest[filename];
      return manifestFile ? opts.cdnUrl + manifestFile : filename;
    }
    manifest ? next() : onManifestFetched(next);
  }
};

// Uploads static content to S3 based on options passed in. Used in CLI.
//
// @param {Object} options

module.exports.upload = function(options) {
  setup(options, function(err, options, client) {
    if (err) return options.callback(err);
    var files = glob.sync(options.files, { nodir: true }).filter(function(f) {
      return !f.match('node_modules');
    });
    uploadManifest(files, options, function(err, manifest) {
      if (err) return options.callback(err)
      async.mapSeries(files, function(file, callback) {
        var s3Path = _.last(file.split(options.root));
        var headers = generateHeaders(file);
        if (manifest[s3Path]) s3Path = manifest[s3Path];
        options.client.putFile(file, s3Path, headers, function(err, res) {
          if (err) {
            console.warn('Error uploading ' + file + ' to ' +
              options.bucket + s3Path + ': ' + err);
          } else {
            console.log('Uploaded ' + file + ' to ' +
              options.bucket + s3Path + ' (' + headers['Content-Type'] + ')');
            callback();
          }
        });
      }, options.callback);
    });
  });
};

// Given a filename determines the proper S3 headers.
//
// @param {String} file
// @return {Object} header Headers object

var generateHeaders = function(file) {
  var contentType = mime.lookup(
    path.extname(file.replace('.gz', '').replace('.cgz', '')
      .replace('.jgz', ''))
  );
  var headers = {
    'Cache-Control': 'max-age=315360000, public',
    'Content-Type': contentType,
    'x-amz-acl': 'public-read'
  };
  if(file.match(/\.gz$/) || file.match(/\.cgz$/)
     || file.match(/\.jgz$/))
    headers['Content-Encoding'] = 'gzip';
  return headers;
}

// Fingerpints files and generates a manifest hash.
//
// @param {Array} files
// @param {Object} options
// @return {Object} manifest

var generateManifest = function(files, options) {
  var manifest = {};
  files.forEach(function(file) {
    var key = _.last(file.split(options.root));
    var ext = '.' + file.split('.').slice(1).join('.');
    if (!options.fingerprint)
      return manifest[key] = path.join(path.dirname(key), path.basename(file));
    if(!ext.match('js') && !ext.match('css')) return;
    var contents = fs.readFileSync(file);
    var hash = crypto.createHash('sha1').update(contents).digest('hex')
      .slice(0, 8);
    var fingerprintedFilename = path.basename(file, ext) + '-' + hash + ext;
    manifest[key] = path.join(path.dirname(key), fingerprintedFilename);
  });
  return manifest
}

// Given an array of filenames, will generate fingerprints based on files
// contents and upload a json file of { originalFilename: fingerprintedFilename }
//
// @param {Array} files
// @param {Object} options
// @param {Function} callback Calls back with (err, manifest)

var uploadManifest = function(files, options, callback) {
  var manifest = generateManifest(files, options);
  var manifestDest = '/manifest-' + options.hash + '.json';
  options.client.putBuffer(
    JSON.stringify(manifest),
    manifestDest,
    {
      'Cache-Control': 'max-age=315360000, public',
      'Content-Type': 'application/json',
      'x-amz-acl': 'public-read'
    },
    function(err) {
      console.log('Uploaded manifest to ' + options.bucket + manifestDest);
      callback(err, manifest);
    }
  );
  return manifest;
}

// Common setup whether using middleware or CLI.
// Sets defaults on options, creates a knox client, and retrieves the current
// git hash.
//
// @param {Object} options
// @param {Function} callback Calls back with (err, options)

var setup = function(options, callback) {
  if (!options) options = {};
  var options = _.clone(_.defaults(options, {
    files: process.cwd() + '/**/public/**',
    root: 'public',
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    cdnUrl: process.env.CDN_URL,
    fingerprint: true
  }));
  options.client = knox.createClient({
    key: options.key,
    secret: options.secret,
    bucket: options.bucket
  });
  if (COMMIT_HASH) {
    options.hash = COMMIT_HASH.trim();
    callback(null, options);
  } else {
    exec('git rev-parse --short HEAD', function(err, gitHash) {
      options.hash = gitHash.trim();
      callback(err, options);
    });
  }
};
