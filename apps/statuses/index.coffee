app = module.exports = require('express')()

statuses = [
  [200, 'OK']
  [403, 'Forbidden']
  [404, 'Not Found']
  [500, 'Internal Server Error']
]

statuses.map ([code, status]) ->
  send = (_req, res) ->
    res
      .status code
      .send status: status

  app
    .get "/statuses/#{code}", send
    .post "/statuses/#{code}", send
