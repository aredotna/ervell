Q = require 'bluebird-q'
request = require 'superagent'

module.exports = ({ query, variables, user }) ->
  Q.promise (resolve, reject) ->
    post = request
      .post METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'

    if (token = req?.user?.get?('accessToken') or req?.user?.accessToken)?
      post.set 'X-AUTH-TOKEN"': token

    post
      .send
        query: query
        variables: variables

      .end (err, response) ->
        return reject err if err?

        if response.body.errors?
          error = new Error JSON.stringify response.body.errors
          error.status = 404 if some(response.body.errors, ({ message }) -> message.match /Not Found/)
          error.data = response.body.data
          return reject error

        resolve response.body.data
