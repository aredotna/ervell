Q = require 'bluebird-q'
request = require 'superagent'
{ GRAPHQL_ENDPOINT, X_APP_TOKEN } = require '../config.coffee'
{ some } = require 'underscore'

module.exports = ({ query, variables, user }) ->
  Q.promise (resolve, reject) ->
    post = request
      .post GRAPHQL_ENDPOINT
      .set 'Accept', 'application/json'

    if (token = user?.get?('access_token') or user?.access_token)?
      post.set 'X-AUTH-TOKEN': token
    
    if X_APP_TOKEN
      post.set 'X-APP-TOKEN': X_APP_TOKEN

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
