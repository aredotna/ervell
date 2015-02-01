
# s3-policy

  [S3 policy][] generation for client-side uploads. By default, `Content-Type` and
  `Content-Length` form fields are __required__, but can contain any value.

## Options

Create an s3 policy and signature via `opts`:

 - `acl` acl such as "public-read"
 - `expires` expiration date
 - `secret` s3 secret
 - `bucket` bucket name
 - `key` access key
 - `name` restrict key to prefix [""]
 - `type` restrict content-type prefix [""]
 - `length` max size restriction
 - `conditions` an optional Array of custom "conditions" to include in the policy

An object with `.signature` and `.policy` is returned.

## Example

```js
var policy = require('s3-policy');

var p = policy({
  secret: 'something',
  length: 5000000,
  bucket: 'i.cloudup.com',
  key: 'asdfasdfaewrw',
  expires: new Date(Date.now() + 60000),
  acl: 'public-read'
});

console.log(p.policy);
console.log(p.signature);
```

## License

(The MIT License)

Copyright (c) 2013 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[S3 policy]: http://docs.aws.amazon.com/AmazonS3/latest/dev/HTTPPOSTForms.html#HTTPPOSTConstructPolicy
