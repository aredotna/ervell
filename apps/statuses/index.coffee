app = module.exports = require('express')()

statuses = [
  [200, 'OK']
  [403, 'Forbidden']
  [404, 'Not Found']
  [500, 'Internal Server Error']
]

statuses.map ([code, status]) ->
  send = (_req, res) ->
    response = switch code
      when 400, 404, 500
        code: code
        message: status
        description: "#{code}: #{status}"

      else
        status: status

    res
      .status code
      .send response

  app
    .get "/statuses/#{code}", send
    .post "/statuses/#{code}", send
    .put "/statuses/#{code}", send
    .delete "/statuses/#{code}", send
