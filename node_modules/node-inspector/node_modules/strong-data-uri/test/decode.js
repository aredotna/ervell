/* Copyright (c) 2013 StrongLoop, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var expect = require('chai').expect;

var dataUri = require('..');

describe('decode', function() {
  it('parses base64-encoded payload into a buffer', function() {
    var buffer = dataUri.decode('data:text/plain;base64,aGVsbG8gd29ybGQ=');
    expect(buffer).to.be.instanceOf(Buffer);
    expect(buffer.toString('ASCII')).to.equal('hello world');
  });

  it('parses url-encoded payload into a buffer', function() {
    var buffer = dataUri.decode('data:,hello%20world');
    expect(buffer.toString('ASCII')).to.equal('hello world');
  });

  it('parses base64-encoded payload into a buffer', function() {
    var buffer = dataUri.decode('data:;base64,aGVsbG8gd29ybGQ=');
    expect(buffer.toString('ASCII')).to.equal('hello world');
  });

  it('parses a URI with charset but no type/subtype into a buffer', function() {
    var buffer = dataUri.decode('data:;charset=iso-8859,hello%20world');
    expect(buffer.toString('ASCII')).to.equal('hello world');
  });

  it('detects the mediatype when it exists', function() {
    var buffer = dataUri.decode('data:,hello%20world');
    expect(buffer.mediatype).to.equal('text/plain;charset=US-ASCII');
  });

  it('detects the mediatype without parameters', function() {
    var buffer = dataUri.decode('data:text/plain,hello%20world');
    expect(buffer.mediatype).to.equal('text/plain');
  });

  it('detects the mediatype with parameters and base64', function() {
    var buffer = dataUri.decode(
      'data:text/plain;charset=iso-8859;base64,aGVsbG8gd29ybGQ=');
    expect(buffer.mediatype).to.equal('text/plain;charset=iso-8859');
  });

  it('detects the mediatype without type/subtype and base64', function() {
    var buffer = dataUri.decode(
      'data:;charset=iso-8859;base64,aGVsbG8gd29ybGQ=');
    expect(buffer.mediatype).to.equal('text/plain;charset=iso-8859');
  });

  it('detects the default charset', function() {
    var buffer = dataUri.decode('data:,hello%20world');
    expect(buffer.charset).to.equal('US-ASCII');
  });

  it('detects the given charset without type/subtype', function() {
    var buffer = dataUri.decode('data:;charset=iso-8859,hello%20world');
    expect(buffer.charset).to.equal('iso-8859');
  });

  it('detects the given charset with type/subtype', function() {
    var buffer = dataUri.decode(
      'data:text/plain;charset=iso-8859,hello%20world');
    expect(buffer.charset).to.equal('iso-8859');
  });

  it('detects no charset with type/subtype', function() {
    var buffer = dataUri.decode('data:text/plain,hello%20world');
    expect(buffer.charset).to.be.equal(null);
  });

  it('detects no charset with type/subtype and param', function() {
    var buffer = dataUri.decode('data:text/plain;other=foo,hello%20world');
    expect(buffer.charset).to.be.equal(null);
  });

  it('detects the default mimetype', function() {
    var buffer = dataUri.decode('data:,hello%20world');
    expect(buffer.mimetype).to.equal('text/plain');
  });

  it('detects the default mimetype with charset given', function() {
    var buffer = dataUri.decode('data:;charset=iso-8859,hello%20world');
    expect(buffer.mimetype).to.equal('text/plain');
  });

  it('detects the given mimetype', function() {
    var buffer = dataUri.decode(
      'data:text/xml;charset=iso-8859,hello%20world');
    expect(buffer.mimetype).to.equal('text/xml');
  });

  it('detects the given mimetype without encoding', function() {
    var buffer = dataUri.decode('data:text/xml,hello%20world');
    expect(buffer.mimetype).to.be.equal('text/xml');
  });

  it('detects the given mimetype with type/subtype and param', function() {
    var buffer = dataUri.decode('data:text/xml;other=foo,hello%20world');
    expect(buffer.mimetype).to.be.equal('text/xml');
  });

  it('throws when URI does not start with "data:"', function() {
    expect(function() { dataUri.decode('http://foo/bar'); })
      .to.throw(/^Not a valid data URI/);
  });

  it('throws when URI does not contain comma', function() {
    expect(function() { dataUri.decode('data:text/plain'); })
      .to.throw(/^Not a valid data URI/);
  });
});
