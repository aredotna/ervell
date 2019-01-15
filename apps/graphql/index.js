import axios from 'axios';
import express from 'express';

import { GRAPHQL_ENDPOINT, X_APP_TOKEN } from 'config.coffee';

const app = express();

app.post('/graphql', (req, res) => {
  const X_AUTH_TOKEN = (req.user && req.user.get('authentication_token')) || '';

  const headers = {
    'X-AUTH-TOKEN': req.headers['x-auth-token'] || X_AUTH_TOKEN,
    'X-APP-TOKEN': req.headers['x-app-token'] || X_APP_TOKEN,
  };

  return axios({
    method: 'post',
    url: GRAPHQL_ENDPOINT,
    data: req.body,
    headers,
  })
    .then(({ data }) => res.json(data))
    .catch(err => res.json({
      code: err.status || 500,
      message: err.message,
      stack: err.stack,
    }));
});

module.exports = app;
