import axios from 'axios';
import express from 'express';
import sharify from 'sharify';

import CONFIG from 'config.coffee';

const app = express();

app.post('/graphql', (req, res) => {
  const X_AUTH_TOKEN = (
    req.headers['x-auth-token'] ||
      (req.user && req.user.get('authentication_token')));

  const X_APP_TOKEN = (
    req.headers['x-app-token'] ||
      CONFIG.X_APP_TOKEN);

  const X_SHARE_TOKEN = (req.headers['x-share-token'] ||
    sharify.data.X_SHARE_TOKEN);

  const headers = {
    ...(X_AUTH_TOKEN && { 'X-AUTH-TOKEN': X_AUTH_TOKEN }),
    ...(X_APP_TOKEN && { 'X-APP-TOKEN': X_APP_TOKEN }),
    ...(X_SHARE_TOKEN && { 'X-SHARE-TOKEN': X_SHARE_TOKEN }),
  };

  return axios({
    method: 'post',
    url: CONFIG.GRAPHQL_ENDPOINT,
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
